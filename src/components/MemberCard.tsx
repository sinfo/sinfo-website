import React from "react";
import ImageWithFallback from "./ImageWithFallback";
import Link from "next/link";

interface MemberCardProps {
  name: string;
  img: string;
  team: string;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    facebook?: string;
  };
  sinfo_email: string;
}

const getTeamColor = (team: string) => {
  const teamLower = team.toLowerCase();

  if (teamLower.includes("dev")) return "bg-sinfo-septenary";
  if (teamLower.includes("multimedia")) return "bg-sinfo-senary";
  if (teamLower.includes("coordination")) return "bg-sinfo-primary";
  if (teamLower.includes("marketing")) return "bg-sinfo-secondary";
  if (teamLower.includes("logistics")) return "bg-sinfo-tertiary";
  if (teamLower.includes("partnerships")) return "bg-sinfo-quinary";

  return "bg-sinfo-primary";
};

const getTeamName = (team: string) => {
  const teamLower = team.toLowerCase();

  if (teamLower.includes("dev")) return "Dev Team";
  if (teamLower.includes("multimedia")) return "Multimedia";
  if (teamLower.includes("coordination")) return "Coordination";
  if (teamLower.includes("marketing")) return "Marketing";
  if (teamLower.includes("logistics")) return "Logistics";
  if (teamLower.includes("partnerships")) return "Partnerships";

  return team; // Return original if no match
};

export default function MemberCard({
  name,
  img,
  team,
  socials,
  sinfo_email,
}: MemberCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Team Color Header */}
      <div className={`h-2 w-full ${getTeamColor(team)}`} />

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

      {/* Content Container */}
      <div className="p-3 sm:p-4">
        {/* Name */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 text-center mb-2 group-hover:text-sinfo-primary transition-colors duration-300">
          {name}
        </h3>

        {/* Team */}
        <p className="text-xs sm:text-sm text-gray-600 text-center mb-3">
          {getTeamName(team)}
        </p>

        {/* Social Links & Email */}
        <div className="flex justify-center items-center gap-2">
          {/* LinkedIn */}
          {socials?.linkedin && (
            <Link
              href={
                socials.linkedin.startsWith("http")
                  ? socials.linkedin
                  : `https://linkedin.com/in/${socials.linkedin}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              title="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
          )}

          {/* GitHub */}
          {socials?.github && (
            <Link
              href={
                socials.github.startsWith("http")
                  ? socials.github
                  : `https://github.com/${socials.github}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              title="GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
          )}

          {/* Email */}
          {sinfo_email && (
            <Link
              href={`mailto:${sinfo_email}`}
              className="text-gray-600 hover:text-red-600 transition-colors duration-200"
              title="Email"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
