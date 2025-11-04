import { CompanyService } from "@/services/CompanyService";
import { EventService } from "@/services/EventService";
import BlankPageMessage from "@/components/BlankPageMessage";
import CompaniesTabs from "@/components/CompaniesTabs";

export const dynamic = "force-dynamic";

export default async function CompaniesPage() {
  const event = await EventService.getLatest();
  const edition = event ? event.id - 1 : 33;

  const companies = event
    ? await CompanyService.getCompanies(edition.toString())
    : [];

  if (!event || !companies) {
    return <BlankPageMessage message="Could not fetch companies data." />;
  }

  const filterCompanies = (partner: boolean) => {
    return companies.filter(
      (company) =>
        company.participation.filter(
          (c) => c.event === edition && c.partner === partner,
        ).length > 0,
    );
  };

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
              Meet the amazing companies and organizations that make SINFO
              possible. Their support helps us deliver an unforgettable
              experience year after year.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {companies.length === 0 ? (
            <BlankPageMessage message="No companies to display at the moment." />
          ) : (
            <CompaniesTabs sponsors={sponsors} partners={partners} />
          )}
        </div>
      </section>
    </main>
  );
}
