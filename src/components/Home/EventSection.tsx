"use client";

import React from "react";
import ImageWithFallback from "../ImageWithFallback";
import { useEvent } from "@/context/EventContext";

interface EventSectionProps {
  backgroundClass: string;
}

const eventItems = [
  {
    title: "Speakers",
    image: "/images/event/speakers.jpg",
  },
  {
    title: "Networking",
    image: "/images/event/networking.jpg",
  },
  {
    title: "Company Presentations",
    image: "/images/event/company-presentations.jpg",
  },
  {
    title: "Workshops",
    image: "/images/event/workshops.jpg",
  },
  {
    title: "Opportunities",
    image: "/images/event/opportunities.jpg",
  },
  {
    title: "Giveaways",
    image: "/images/event/giveaways.jpg",
  },
];

export default function EventSection({ backgroundClass }: EventSectionProps) {
  const { event } = useEvent();

  return (
    <section
      id="event"
      className={`relative z-20 w-full py-12 sm:py-14 md:py-16 ${backgroundClass}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          The Event
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-3xl mx-auto mb-6 sm:mb-7 md:mb-8 px-2">
          Not sure why you should attend{" "}
          <span className="font-semibold">{event?.name}</span>? We&apos;ll give
          you six great reasons to not miss out on the{" "}
          <span className="font-bold">
            biggest free tech conference in Portugal
          </span>
          :
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {eventItems.map((item) => (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg group"
            >
              {/* Background Image */}
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                width={500}
                height={300}
                className="w-full h-40 sm:h-44 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

              {/* Text */}
              <h3 className="absolute inset-0 flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl font-semibold px-4">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
