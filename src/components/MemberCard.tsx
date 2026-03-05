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

const getTeamGradient = (team: string) => {
  const teamLower = team.toLowerCase();

  if (teamLower.includes("dev"))
    return "bg-gradient-to-br from-sinfo-primary via-sinfo-primary to-sinfo-septenary";
  if (teamLower.includes("multimedia"))
    return "bg-gradient-to-br from-sinfo-primary via-sinfo-primary to-sinfo-senary";
  if (teamLower.includes("coordination"))
    return "bg-gradient-to-br from-sinfo-primary via-sinfo-primary to-sinfo-primary";
  if (teamLower.includes("marketing"))
    return "bg-gradient-to-br from-sinfo-primary via-sinfo-primary to-sinfo-secondary";
  if (teamLower.includes("logistics"))
    return "bg-gradient-to-br from-sinfo-primary via-sinfo-primary to-sinfo-tertiary";
  if (teamLower.includes("partnerships"))
    return "bg-gradient-to-br from-sinfo-primary via-sinfo-primary to-sinfo-quinary";

  return "bg-gradient-to-br from-sinfo-primary via-sinfo-primary to-sinfo-primary";
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
  const names = name.trim().split(" ");
  const firstName = names[0];
  const lastName = names.slice(1).join(" ");

  return (
    <div className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
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

      {/* Gradient content panel — colour varies by team */}
      <div
        className={`${getTeamGradient(team)} p-3 sm:p-4 flex flex-col justify-between`}
        style={{ height: "7rem" }}
      >
        {/* Name — first name and last name on separate lines */}
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
            {firstName}
          </h3>
          <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
            {lastName}
          </h3>
        </div>

        {/* Team + Socials row */}
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm text-white/80">
            {getTeamName(team)}
          </p>

          <div className="flex items-center gap-2">
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
                className="text-white/80 hover:text-white transition-colors duration-200"
                title="LinkedIn"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            )}

            {/* Email */}
            {sinfo_email && (
              <Link
                href={`mailto:${sinfo_email}`}
                className="text-white/80 hover:text-white transition-colors duration-200"
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
    </div>
  );
}
