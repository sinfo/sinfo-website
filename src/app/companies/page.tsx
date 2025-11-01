"use client";

import { useEffect, useState } from "react";
import { useEvent } from "@/context/EventContext";
import { CompanyService } from "@/services/CompanyService";
import GridList from "@/components/GridList";
import CompanyCard from "@/components/CompanyCard";
import Spinner from "@/components/Spinner";
import BlankPageMessage from "@/components/BlankPageMessage";

type Tab = "sponsors" | "partners";

export default function CompaniesPage() {
  const { event } = useEvent();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("sponsors");
  const edition = event ? event.id - 1 : 0;

  useEffect(() => {
    if (event) {
      CompanyService.getCompanies(edition.toString()).then((data) => {
        if (data) {
          setCompanies(data);
        }
        setLoading(false);
      });
    }
  }, [event, edition]);

  function filterCompanies(partner: boolean) {
    return companies.filter(
      (company) =>
        company.participation.filter(
          (c) => c.event == edition && c.partner == partner,
        ).length > 0,
    );
  }

  const partners = filterCompanies(true);
  const sponsors = filterCompanies(false);

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sinfo-primary via-sinfo-primary to-sinfo-secondary py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Companies
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Meet the amazing companies and organizations that make SINFO possible.
              Their support helps us deliver an unforgettable experience year after year.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {loading ? (
            <Spinner />
          ) : companies.length === 0 ? (
            <BlankPageMessage message="No companies to display at the moment." />
          ) : (
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
          )}
        </div>
      </section>
    </main>
  );
}

