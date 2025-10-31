"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import ImageWithFallback from "../ImageWithFallback";

export type Logo = { name: string; img: string };

export default function LogoCarousel({
  logos,
  currentIndex,
  setIndex,
  ariaLabel = "logo carousel",
}: {
  logos: Logo[];
  currentIndex: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  ariaLabel?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const startX = useRef(0);

  const n = logos.length;

  // measure container width
  const [containerW, setContainerW] = useState(0);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setContainerW(Math.max(width, 280));
      }
    };
    update();
    window.addEventListener("resize", update);
    const timer = setTimeout(update, 150);
    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(timer);
    };
  }, []);

  // Responsive configuration
  const isMobile = containerW < 640;
  const isTablet = containerW >= 640 && containerW < 1024;

  // Responsive values
  const gap = isMobile ? 16 : isTablet ? 20 : 24;
  const padding = isMobile ? 12 : isTablet ? 16 : 20;

  // Calculate item dimensions
  let itemWidth: number;
  if (isMobile) {
    // On mobile, center item takes 60% of container
    itemWidth = Math.floor(containerW * 0.6);
  } else if (isTablet) {
    itemWidth = Math.floor((containerW - gap * 4) / 3);
  } else {
    itemWidth = Math.floor((containerW - gap * 5) / 4);
  }

  itemWidth = Math.max(110, Math.min(itemWidth, 200));
  const itemHeight = Math.round(itemWidth * 0.7);

  // Calculate positioning
  const getPosition = () => {
    const offset = (containerW - itemWidth) / 2;
    return offset - currentIndex * (itemWidth + gap);
  };

  const basePosition = getPosition();
  const translateX = basePosition + dragOffset;

  // Touch/Mouse handlers
  const handleStart = useCallback((clientX: number) => {
    startX.current = clientX;
    setDragging(true);
  }, []);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!dragging) return;
      const diff = clientX - startX.current;
      setDragOffset(diff);
    },
    [dragging],
  );

  const handleEnd = useCallback(() => {
    if (!dragging) return;

    const threshold = itemWidth / 3;

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && currentIndex > 0) {
        setIndex(currentIndex - 1);
      } else if (dragOffset < 0 && currentIndex < n - 1) {
        setIndex(currentIndex + 1);
      }
    }

    setDragging(false);
    setDragOffset(0);
  }, [dragging, dragOffset, itemWidth, currentIndex, n, setIndex]);

  // Pointer events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      handleStart(e.clientX);
      container.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      handleMove(e.clientX);
    };

    const onPointerUp = (e: PointerEvent) => {
      handleEnd();
      if (container.hasPointerCapture(e.pointerId)) {
        container.releasePointerCapture(e.pointerId);
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
    };
  }, [handleStart, handleMove, handleEnd]);

  return (
    <div className="w-full select-none">
      {/* Carousel container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{
          height: itemHeight + padding * 2,
          touchAction: "pan-y",
          cursor: dragging ? "grabbing" : "grab",
        }}
      >
        <div
          className="absolute top-0 left-0 h-full flex items-center"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: dragging
              ? "none"
              : "transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            gap: `${gap}px`,
            paddingTop: `${padding}px`,
            paddingBottom: `${padding}px`,
            willChange: dragging ? "transform" : "auto",
          }}
        >
          {logos.map((logo, i) => {
            const dist = Math.abs(i - currentIndex);
            const isCenter = i === currentIndex;

            // Scale based on distance from center
            const scale = isCenter
              ? isMobile
                ? 1.15
                : 1.1
              : Math.max(0.7, 1 - dist * 0.15);

            const opacity = isCenter ? 1 : Math.max(0.4, 0.8 - dist * 0.2);

            return (
              <div
                key={i}
                className="flex-shrink-0 bg-white rounded-lg sm:rounded-xl shadow-md flex items-center justify-center"
                style={{
                  width: itemWidth,
                  height: itemHeight,
                  transform: `scale(${scale})`,
                  opacity,
                  transition: dragging ? "none" : "all 400ms ease-out",
                  pointerEvents: dragging ? "none" : "auto",
                }}
                onClick={() => !dragging && setIndex(i)}
              >
                <div className="relative w-full h-full p-2 sm:p-3 md:p-4">
                  <ImageWithFallback
                    src={logo.img}
                    alt={logo.name}
                    fill
                    className="object-contain"
                    draggable={false}
                    sizes="(max-width: 640px) 60vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-4 gap-2">
        {logos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-sinfo-primary w-6" : "bg-gray-300 w-2"
            }`}
            aria-label={`Go to logo ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
