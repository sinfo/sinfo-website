import EventSection from "@/components/Home/EventSection";
import HeroSection from "@/components/Home/HeroSection";
import SpeakersHighlight from "@/components/Home/SpeakersHighlight";
import AboutUs from "@/components/Home/AboutUs";
import SponsorsPartners from "@/components/Home/SponsorsPartners";
import FAQ from "@/components/Home/FAQ";
import CurrentSpeakersHighlight from "@/components/Home/CurrentSpeakersHighlight";

export default async function Root() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <CurrentSpeakersHighlight backgroundClass="bg-sinfo-light" />
      {/* <SpeakersHighlight backgroundClass="bg-white" /> */}
      <EventSection backgroundClass="bg-white" />
      <AboutUs backgroundClass="bg-sinfo-light" />
      <SponsorsPartners backgroundClass="bg-white" />
      <FAQ backgroundClass="bg-sinfo-light" />
    </main>
  );
}
