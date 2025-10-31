import EventSection from "@/components/Home/EventSection";
import HeroSection from "@/components/Home/HeroSection";
import SpeakersHighlight from "@/components/Home/SpeakersHighlight";
import AboutUs from "@/components/Home/AboutUs";
import SponsorsPartners from "@/components/Home/SponsorsPartners";
import FAQ from "@/components/Home/FAQ";

export default async function Root() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <SpeakersHighlight backgroundClass="bg-white" />
      <EventSection backgroundClass="bg-sinfo-light" />
      <AboutUs backgroundClass="bg-white" />
      <SponsorsPartners backgroundClass="bg-sinfo-light" />
      <FAQ backgroundClass="bg-white" />
    </main>
  );
}
