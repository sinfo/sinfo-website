import { CompanyService } from "@/services/CompanyService";
import { EventService } from "@/services/EventService";
import BlankPageMessage from "@/components/BlankPageMessage";
import GridList from "@/components/GridList";
import CompanyCard from "@/components/CompanyCard";
import SponsorHeading from "@/components/Companies/SponsorHeading";

export const dynamic = "force-dynamic";

export default async function SponsorsPage() {
  const event = await EventService.getLatest();
  const edition = event ? event.id : 33;

  //   const companies = event
  //     ? await CompanyService.getCompanies(edition.toString())
  //     : [];
  const companies: any[] = []; // Placeholder for companies data

  if (!event || !companies) {
    return <BlankPageMessage message="Could not fetch companies data." />;
  }

  const sponsors = companies.filter((c) => c.partner === false);

  // Split sponsors by package
  const maxSponsors = sponsors.filter((c) => c.advertisementLvl === "max");
  const medSponsors = sponsors.filter((c) => c.advertisementLvl === "med");
  const minSponsors = sponsors.filter(
    (c) => c.advertisementLvl === "min" || c.advertisementLvl === "other",
  );

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="bg-gradient-to-br from-sinfo-primary via-sinfo-primary to-sinfo-secondary py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Sponsors
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Meet the amazing sponsors that make SINFO shine. Their commitment
              help us deliver an unforgettable, free tech conference to over
              5,000 attendees every year.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          {sponsors.length === 0 ? (
            <BlankPageMessage message="We currently have no sponsors to showcase. Please check back later to see the amazing companies supporting SINFO!" />
          ) : (
            <>
              {maxSponsors.length > 0 && (
                <section>
                  <SponsorHeading>Platinum Sponsors</SponsorHeading>
                  <GridList className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {maxSponsors.map((company) => (
                      <CompanyCard
                        key={company.id}
                        company={company}
                        size="max"
                      />
                    ))}
                  </GridList>
                </section>
              )}

              {medSponsors.length > 0 && (
                <section>
                  <SponsorHeading>Gold Sponsors</SponsorHeading>
                  <GridList className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {medSponsors.map((company) => (
                      <CompanyCard
                        key={company.id}
                        company={company}
                        size="med"
                      />
                    ))}
                  </GridList>
                </section>
              )}

              {minSponsors.length > 0 && (
                <section>
                  <SponsorHeading>Silver Sponsors</SponsorHeading>
                  <GridList className="grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                    {minSponsors.map((company) => (
                      <CompanyCard
                        key={company.id}
                        company={company}
                        size="min"
                      />
                    ))}
                  </GridList>
                </section>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
