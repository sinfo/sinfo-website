import { createMetadata } from "@/lib/seo";
import { CompanyService } from "@/services/CompanyService";

export const metadata = createMetadata({
  title: "Partners",
  description:
    "Meet the organisations and partners that collaborate with SINFO to deliver an unforgettable tech conference experience.",
  path: "/partners",
  image: "/images/pages/parners.jpg",
});
import { EventService } from "@/services/EventService";
import BlankPageMessage from "@/components/BlankPageMessage";
import GridList from "@/components/GridList";
import CompanyCard from "@/components/CompanyCard";
import SponsorHeading from "@/components/Companies/SponsorHeading";

export const dynamic = "force-dynamic";

type PartnerCategory = {
  title: string;
  items: Company[];
};

const normalizeName = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const getPartnerCategory = (company: Company) => {
  const name = normalizeName(company.name);

  if (name.includes("publico") || name.includes("the next big idea")) {
    return "Media Partners";
  }

  if (
    name.includes("turismo de lisboa") ||
    name.includes("turismo de portugal")
  ) {
    return "Supported By";
  }

  if (
    name.includes("dei") ||
    name.includes("teamlyzer") ||
    name.includes("microsoft")
  ) {
    return "Institutional Partners";
  }

  return "Other Partners";
};

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
  const partnerCategories: PartnerCategory[] = [
    {
      title: "Media Partners",
      items: partners.filter(
        (company) => getPartnerCategory(company) === "Media Partners",
      ),
    },
    {
      title: "Supported By",
      items: partners.filter(
        (company) => getPartnerCategory(company) === "Supported By",
      ),
    },
    {
      title: "Institutional Partners",
      items: partners.filter(
        (company) => getPartnerCategory(company) === "Institutional Partners",
      ),
    },
    {
      title: "Other Partners",
      items: partners.filter(
        (company) => getPartnerCategory(company) === "Other Partners",
      ),
    },
  ].filter((category) => category.items.length > 0);

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
            <div className="space-y-12">
              {partnerCategories.map((category) => (
                <section key={category.title} className="space-y-4">
                  <SponsorHeading>{category.title}</SponsorHeading>
                  <GridList className="!grid-cols-[repeat(auto-fit,minmax(16rem,18rem))] justify-center">
                    {category.items.map((company) => (
                      <CompanyCard key={company.id} company={company} />
                    ))}
                  </GridList>
                </section>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
