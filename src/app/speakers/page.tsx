import React from "react";
import BlankPageMessage from "@/components/BlankPageMessage";
import { SpeakerService } from "@/services/SpeakerService";
import MovingGrid from '@/components/MovingGrid';

export default async function SpeakersPage() {
  const speakers = await SpeakerService.getSpeakers({ event: 32 });
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

  // Split speakers into 3 rows
  const speakersPerRow = Math.ceil(speakers.length / 3);
  const rows = Array.from({ length: 3 }, (_, rowIndex) => {
    const startIndex = rowIndex * speakersPerRow;
    const endIndex = Math.min(startIndex + speakersPerRow, speakers.length);
    const rowSpeakers = speakers.slice(startIndex, endIndex);


    const copies = 10; // enough
    return Array.from({ length: copies }).flatMap((_, copyIdx) =>
      rowSpeakers.map((speaker, index) => ({
        ...speaker,
        uniqueId: `${rowIndex}-${copyIdx}-${index}`,
        imageIndex: (startIndex + index) % 5,
      }))
    );
  });

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
              Every year, SINFO brings together some of the most influential minds in technology and innovation. Meet some of the global voices that helped shape SINFO&apos;s excellence. 
            </p>
          </div>
        </div>
      </section>

      {/* Speakers Grid */}
      <section className="pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <MovingGrid rows={rows} />
          </div>
        </div>
      </section>
    </main>
  );
}
