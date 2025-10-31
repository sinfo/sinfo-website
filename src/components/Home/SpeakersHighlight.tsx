"use client";

import React, { useState, useEffect } from "react";
import ImageWithFallback from "../ImageWithFallback";
import { SpeakerService } from "@/services/SpeakerService";

interface SpeakersHighlightProps {
  backgroundClass: string;
}

export default function SpeakersHighlight({
  backgroundClass,
}: SpeakersHighlightProps) {
  const [hoveredSpeaker, setHoveredSpeaker] = useState<string | null>(null);
  const [highlightedSpeakers, setHighlightedSpeakers] = useState<any[]>([]);

  // Take first 6 speakers for the highlight (fetch on client side)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const speakers = await SpeakerService.getSpeakers();
        if (mounted && speakers) setHighlightedSpeakers(speakers.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch speakers", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="speakers"
      className={`relative w-full py-16 sm:py-20 md:py-24 ${backgroundClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Previous Speakers
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            From global tech leaders to industry innovators, they came to
            inspire the next generation. Meet the minds that powered the last
            edition of SINFO.
          </p>
        </div>

        {/* Speakers Grid with Bento-style layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12">
          {highlightedSpeakers.map((speaker, index) => {
            const isLarge = index === 0 || index === 2;
            const isHovered = hoveredSpeaker === speaker.id;

            return (
              <div
                key={speaker.id}
                className={`relative overflow-hidden rounded-lg sm:rounded-xl shadow-lg cursor-pointer transition-all duration-300 ${
                  isLarge ? "md:row-span-2" : "row-span-1"
                } ${isHovered ? "ring-2 sm:ring-4 ring-sinfo-primary" : ""}`}
                onMouseEnter={() => setHoveredSpeaker(speaker.id)}
                onMouseLeave={() => setHoveredSpeaker(null)}
              >
                {/* Speaker Image */}
                <div
                  className={`relative w-full h-full ${isLarge ? "min-h-[200px] sm:min-h-[250px]" : "min-h-[150px] sm:min-h-[200px] md:min-h-[250px]"}`}
                >
                  <ImageWithFallback
                    src={speaker.img}
                    alt={speaker.name}
                    fill
                    className="object-cover transition-transform duration-500"
                    style={{
                      transform: isHovered ? "scale(1.5)" : "scale(1.1)",
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300 ${
                      isHovered
                        ? "from-black/90 via-black/60 to-transparent opacity-100"
                        : "from-black/60 via-black/30 to-transparent opacity-80"
                    }`}
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-3 sm:p-4 md:p-6 flex flex-col justify-end">
                    {/* Always visible content */}
                    <div className="transform transition-all duration-300">
                      <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-0.5 sm:mb-1">
                        {speaker.name}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm md:text-base font-medium">
                        {speaker.title}
                      </p>

                      {/* Hover content - hidden on mobile for better UX */}
                      <div
                        className={`overflow-hidden transition-all duration-300 hidden md:block ${
                          isHovered
                            ? "max-h-96 opacity-100 mt-4"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-white/80 text-sm leading-relaxed line-clamp-6">
                          {speaker.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Company Logos Section */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12">
            {[
              "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Pixar.svg/800px-Pixar.svg.png?20110510121229",
            ].map((logo, index) => (
              <div
                key={index}
                className="relative h-6 sm:h-8 md:h-10 w-20 sm:w-24 md:w-32 opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <ImageWithFallback
                  src={logo}
                  alt={`Company logo ${index + 1}`}
                  fill
                  className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
