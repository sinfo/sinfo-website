import React from "react";
import SpeakerBlob from "./SpeakerBlob";
import ImageWithFallback from "@/components/ImageWithFallback";

interface SpeakerCardProps {
  speaker: Speaker;
  color: string;
}

export default function SpeakerCard({ speaker, color }: SpeakerCardProps) {
  return (
    <div className="group relative flex h-[380px] w-[280px] md:h-[420px] md:w-[300px] flex-shrink-0 flex-col overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Background container for the blob */}
      <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
        <div className="relative h-[300px] w-[300px] translate-y-[20%] transition-transform duration-500 ease-in-out group-hover:scale-[5] group-hover:translate-y-0">
          <SpeakerBlob color={color} className="h-full w-full" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-8">
        {/* Text Details */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold leading-tight text-sinfo-primary transition-colors duration-300 group-hover:text-white">
            {speaker.name}
          </h3>
          <div className="mt-2 text-sm font-medium text-gray-500 transition-colors duration-300 group-hover:text-white/90">
            <span className="block">{speaker.title}</span>
            {speaker.company?.name && (
              <span className="mt-1 block font-normal opacity-80">
                {speaker.company.name}
              </span>
            )}
          </div>
        </div>

        {/* Image - Pushed to bottom */}
        <div className="mt-auto flex justify-center">
          <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105">
            <ImageWithFallback
              src={speaker.img}
              alt={speaker.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
