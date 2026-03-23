import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venue | SINFO",
  description:
    "Explore the SINFO venue at Técnico Innovation Center. Interactive 3D map with company stands, main stage, networking lounge, and more.",
};

const VenueViewer = dynamic(() => import("@/components/Venue/VenueViewer"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full flex items-center justify-center bg-gray-100"
      style={{ height: "min(75vh, 700px)" }}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-sinfo-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 font-medium">Loading venue...</p>
      </div>
    </div>
  ),
});

export default function VenuePage() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero */}
      <section className="bg-gradient-to-br from-sinfo-primary via-sinfo-primary to-sinfo-secondary py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Venue
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Explore our venue at{" "}
              <a
                href="https://maps.app.goo.gl/oKgrYWbbB6M6tCFv5"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-white"
              >
                Técnico Innovation Center
              </a>
              . Navigate the interactive map to find company stands, the main
              stage, networking areas, and more.
            </p>
          </div>
        </div>
      </section>

      {/* 3D Viewer */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
            <VenueViewer />
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Click on any stand to see details · Toggle between 2D and 3D views
          </p>
        </div>
      </section>
    </main>
  );
}
