import React, { useState, useRef, useEffect, useCallback } from "react";
import SpeakerCard from "./SpeakerCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  speakers: Speaker[];
  speakerColors: Record<string, string>; // Map speaker ID to color
  autoPlayInterval?: number;
}

export default function Carousel({
  speakers,
  speakerColors,
  autoPlayInterval = 3000,
}: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  // Auto-play logic
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 320; // approximate card width + gap
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      
      // If we are at the end and scrolling right, go back to start (loop effect approximation)
      if (direction === "right" && container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
      } else if (direction === "left" && container.scrollLeft <= 0) {
          container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      scroll("right");
    }, autoPlayInterval);
  }, [autoPlayInterval, scroll, stopAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);


  // Check if arrows are needed
  useEffect(() => {
    const checkScrollable = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowArrows(scrollWidth > clientWidth);
      }
    };
    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [speakers]);


  // Drag Handlers
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
    stopAutoPlay();
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    startAutoPlay();
  };

  const onMouseUp = () => {
    setIsDragging(false);
    startAutoPlay();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // scroll-fast
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="relative w-full overflow-hidden px-4 md:px-0 py-4 md:py-10 group/carousel">
        <div className="container mx-auto relative">
             {/* Left Arrow */}
            {showArrows && (
                <button
                onClick={() => {
                    scroll("left");
                    stopAutoPlay();
                    // Restart autoplay after interaction
                    setTimeout(startAutoPlay, 5000);
                }}
                className="absolute left-0 top-1/2 z-30 -translate-y-1/2 -translate-x-4 transform rounded-full bg-white/80 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
                >
                <ChevronLeft className="h-6 w-6 text-sinfo-primary" />
                </button>
            )}


            <div
                ref={scrollContainerRef}
                className="flex cursor-grab gap-4 md:gap-8 overflow-x-auto pb-8 pt-4 scrollbar-hide active:cursor-grabbing snap-x snap-mandatory"
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {/* Add padding to the ends so elements aren't cut off on the sides in container */}
                {speakers.map((speaker, index) => (
                <div key={`${speaker.id}-${index}`} className="snap-center shrink-0">
                    <SpeakerCard
                        speaker={speaker}
                        color={speakerColors[speaker.id] || "#1c2b70"}
                    />
                </div>
                ))}
            </div>

            {/* Right Arrow */}
             {showArrows && (
                <button
                onClick={() => {
                    scroll("right");
                    stopAutoPlay();
                    setTimeout(startAutoPlay, 5000);
                }}
                className="absolute right-0 top-1/2 z-30 -translate-y-1/2 translate-x-4 transform rounded-full bg-white/80 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 opacity-0 group-hover/carousel:opacity-100"
                >
                <ChevronRight className="h-6 w-6 text-sinfo-primary" />
                </button>
            )}
        </div>
    </div>
  );
}
