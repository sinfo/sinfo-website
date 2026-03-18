import React from "react";
import BlankPageMessage from "@/components/BlankPageMessage";
import SpeakerCard from "@/components/Home/CurrentSpeakersHighlight/SpeakerCard";
import { SpeakerService } from "@/services/SpeakerService";
import { buildEditionColorMap } from "@/utils/speakerColors";

export const dynamic = "force-dynamic";

export default async function SpeakersPage() {
  const speakers = await SpeakerService.getSpeakers({ previousEdition: true });
  /**
   * TODO: Fetch speakers from multiple past editions
   *  const eventIds = [32, 30, 31];
   *  const speakerLists = await Promise.all(
   *    eventIds.map((id) => SpeakerService.getSpeakers({ event: id }))
   *  );
   *
   *  const speakers = speakerLists.flat();
   */

  if (!speakers || speakers.length === 0) {
    return (
      <BlankPageMessage message="No speakers found. Please check back later." />
    );
  }

  // compute speaker color map: use edition color (edition 32) for previous speakers
  const speakerColors = await buildEditionColorMap(speakers as any, 32);

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sinfo-primary via-sinfo-primary to-sinfo-secondary py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Meet our Past Speakers
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Every year, SINFO brings together some of the most influential
              minds in technology and innovation. Meet some of the global voices
              that helped shape SINFO&apos;s excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Speakers Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {speakers.map((speaker) => (
              <div key={speaker.id}>
                <SpeakerCard
                  speaker={speaker}
                  color={speakerColors[speaker.id]}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
