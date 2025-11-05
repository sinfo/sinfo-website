"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import ImageWithFallback from "@/components/ImageWithFallback";
import "@/styles/MovingGrid.css";

type Speaker = any;

interface Props {
  rows: Speaker[][];
}

export default function MovingGrid({ rows }: Props) {
  const router = useRouter();

  const navigateToSpeaker = useCallback(
    (id: string | number) => {
      router.push(`/speakers/${id}`);
    },
    [router],
  );

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Left / Right fade overlays to mask cards cut at the edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-3 grid-fade-left" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-3 grid-fade-right" />

      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="relative overflow-hidden py-4"
          onMouseEnter={() => setHoveredRow(rowIndex)}
          onMouseLeave={() => setHoveredRow(null)}
        >
          <div
            className={`flex gap-4 ${rowIndex % 2 === 0 ? "animate-scroll-left" : "animate-scroll-right"} ${
              hoveredRow === rowIndex ? "paused" : ""
            }`}
          >
            {row.map((speaker) => (
              <div
                key={speaker.uniqueId}
                className="flex-shrink-0 w-[220px] cursor-pointer transition-all duration-300"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => navigateToSpeaker(speaker.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      navigateToSpeaker(speaker.id);
                  }}
                  onMouseEnter={() => setHoveredCard(speaker.uniqueId)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col transition-all duration-300 ${
                    hoveredCard === speaker.uniqueId
                      ? "scale-105 border-4 border-blue-400 shadow-2xl"
                      : "border-4 border-transparent"
                  }`}
                >
                  {/* Speaker Image */}
                  <div className="relative h-[260px]">
                    <ImageWithFallback
                      src={speaker.img}
                      alt={speaker.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Speaker Info */}
                  <div className="p-3 bg-white">
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      {speaker.name}
                    </h3>
                    <p className="text-xs text-gray-600 font-medium">
                      {speaker.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
