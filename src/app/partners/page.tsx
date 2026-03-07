import { CompanyService } from "@/services/CompanyService";
import { EventService } from "@/services/EventService";
import BlankPageMessage from "@/components/BlankPageMessage";
import GridList from "@/components/GridList";
import CompanyCard from "@/components/CompanyCard";

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const event = await EventService.getLatest();
  const edition = event ? event.id : 33;

  const companies = event
    ? await CompanyService.getCompanies(edition.toString())
    : [];

  if (!event || !companies) {
    return <BlankPageMessage message="Could not fetch companies data." />;
  }

  const partners = companies.filter((c) => c.partner === true);

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="bg-gradient-to-br from-sinfo-primary via-sinfo-primary to-sinfo-secondary py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Partners
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Meet the fantastic partners and organisations that collaborate
              with SINFO. Their support through partnerships helps us deliver an
              unforgettable experience year after year.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {partners.length === 0 ? (
            <BlankPageMessage message="No partners to display at the moment." />
          ) : (
            <GridList>
              {partners.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </GridList>
          )}
        </div>
      </section>
    </main>
  );
}
