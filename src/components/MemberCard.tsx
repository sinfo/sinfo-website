import React from "react";
import ImageWithFallback from "./ImageWithFallback";

interface MemberCardProps {
  name: string;
  img: string;
}

export default function MemberCard({ name, img }: MemberCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        {img && (
          <ImageWithFallback
            src={img}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-sinfo-primary/80 via-sinfo-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Name Container */}
      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 text-center group-hover:text-sinfo-primary transition-colors duration-300">
          {name}
        </h3>
      </div>
    </div>
  );
}
