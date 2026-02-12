import React from "react";
import ImageWithFallback from "./ImageWithFallback";
import Link from "next/link";

interface MemberCardProps {
  name: string;
  img: string;
  team: string;
  linkedin?: string;
}

export default function MemberCard({
  name,
  img,
  team,
  linkedin,
}: MemberCardProps) {
  // Remove (33) or any number in parentheses from team name
  const cleanTeam = team.replace(/\s*\(\d+\)\s*/g, "").trim();

  // Replace "Dev Team" with just "Dev"
  const displayTeam = cleanTeam.replace(/Dev Team/gi, "Dev");

  const getTeamColor = (team: string) => {
    const teamLower = team.toLowerCase();
    if (teamLower.includes("coord"))
      return "from-sinfo-primary to-sinfo-primary";
    if (teamLower.includes("dev")) return "from-blue-400 to-blue-600";
    if (teamLower.includes("multi")) return "from-pink-500 to-rose-600";
    if (teamLower.includes("mkt") || teamLower.includes("marketing"))
      return "from-red-600 to-red-700";
    if (
      teamLower.includes("logística") ||
      teamLower.includes("logistica") ||
      teamLower.includes("logistics")
    )
      return "from-orange-500 to-orange-600";
    if (teamLower.includes("parcerias") || teamLower.includes("partnerships"))
      return "from-green-400 to-green-600";
    if (teamLower.includes("laranja")) return "from-orange-500 to-orange-600";
    if (teamLower.includes("amarelo")) return "from-yellow-500 to-yellow-600";
    if (teamLower.includes("roxo")) return "from-purple-600 to-purple-700";
    return "from-gray-600 to-gray-700"; // default
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        {img && (
          <ImageWithFallback
            src={img}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Gradient Overlay on Hover - Animates smoothly */}
        <div className="absolute inset-0 bg-gradient-to-t from-sinfo-primary/80 via-sinfo-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Info Container with Animated Gradient */}
      <div className="relative p-3 sm:p-4 overflow-hidden">
        {/* Base gradient layer */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${getTeamColor(team)} transition-opacity duration-500`}
        />

        {/* Hover gradient layer with different direction */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${getTeamColor(team)} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        <div className="flex-1 relative z-10">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white leading-tight transition-all duration-300">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-white/90 mt-1 transition-all duration-300">
            {displayTeam}
          </p>
        </div>
        {linkedin && (
          <Link
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 text-white hover:text-white/80 transition-all duration-300 z-10 hover:scale-110"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
