import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link
      href={company.site || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        <div className="flex-grow flex items-center justify-center p-4 bg-gray-50">
          <ImageWithFallback
            src={company.img}
            alt={`${company.name} logo`}
            width={250}
            height={140}
            className="object-contain h-36 w-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4 text-center border-t bg-white">
          <h3 className="text-md font-semibold text-gray-800 group-hover:text-sinfo-primary truncate">
            {company.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
