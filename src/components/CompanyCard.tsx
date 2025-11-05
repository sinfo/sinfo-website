import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";

interface CompanyCardProps {
  company: Company;
  size?: "max" | "med" | "min";
}

export default function CompanyCard({
  company,
  size = "med",
}: CompanyCardProps) {
  return (
    <Link
      href={company.site || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div
        className={`h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl ${
          size === "max" ? "max-w-xl" : size === "med" ? "max-w-md" : "max-w-xs"
        }`}
      >
        <div className="flex-grow flex items-center justify-center p-4 bg-white">
          <ImageWithFallback
            src={company.img}
            alt={`${company.name} logo`}
            width={size === "max" ? 400 : size === "med" ? 300 : 180}
            height={size === "max" ? 220 : size === "med" ? 160 : 96}
            className={`object-contain transition-transform duration-300 group-hover:scale-105 ${
              size === "max"
                ? "h-48 w-full"
                : size === "med"
                  ? "h-36 w-full"
                  : "h-20 w-full"
            }`}
          />
        </div>
        <div className="p-4 text-center border-t bg-gray-50">
          <h3 className="text-md font-semibold text-gray-800 group-hover:text-sinfo-primary truncate">
            {company.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
