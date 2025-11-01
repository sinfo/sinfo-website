"use client";

import { useState } from "react";
import GridList from "@/components/GridList";
import CompanyCard from "@/components/CompanyCard";
import BlankPageMessage from "@/components/BlankPageMessage";

type Tab = "sponsors" | "partners";

interface CompaniesTabsProps {
  sponsors: Company[];
  partners: Company[];
}

export default function CompaniesTabs({
  sponsors,
  partners,
}: CompaniesTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("sponsors");

  return (
    <>
      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("sponsors")}
            className={`px-6 py-3 text-sm font-semibold rounded-md transition-all duration-200 ${
              activeTab === "sponsors"
                ? "bg-sinfo-primary text-white shadow-md"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Sponsors
            {sponsors.length > 0 && (
              <span className="ml-2 text-xs opacity-75">
                ({sponsors.length})
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("partners")}
            className={`px-6 py-3 text-sm font-semibold rounded-md transition-all duration-200 ${
              activeTab === "partners"
                ? "bg-sinfo-primary text-white shadow-md"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Partners
            {partners.length > 0 && (
              <span className="ml-2 text-xs opacity-75">
                ({partners.length})
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="w-full">
        {/* Sponsors Tab Content */}
        {activeTab === "sponsors" && (
          <div className="animate-fadeIn">
            {sponsors.length > 0 ? (
              <GridList>
                {sponsors.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </GridList>
            ) : (
              <BlankPageMessage message="No sponsors to display at the moment." />
            )}
          </div>
        )}

        {/* Partners Tab Content */}
        {activeTab === "partners" && (
          <div className="animate-fadeIn">
            {partners.length > 0 ? (
              <GridList>
                {partners.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </GridList>
            ) : (
              <BlankPageMessage message="No partners to display at the moment." />
            )}
          </div>
        )}
      </div>
    </>
  );
}
