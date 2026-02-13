import React from "react";
import BlankPageMessage from "@/components/BlankPageMessage";
import SpeakerCard from "@/components/Home/CurrentSpeakersHighlight/SpeakerCard";
import { SpeakerService } from "@/services/SpeakerService";
import { EventService } from "@/services/EventService";
import config from "../../../tailwind.config";

export const dynamic = "force-dynamic";

export default async function CurrentSpeakersPage() {
  const event = await EventService.getLatest();
  const speakers = event
    ? await SpeakerService.getSpeakers({ event: event.id as unknown as number })
    : [];

  if (!speakers || speakers.length === 0) {
    return <BlankPageMessage message="No current speakers found." />;
  }

  // Build simple color map based on theme colors (reuse logic from highlight)
  const themeColors = (config.theme?.extend?.colors?.sinfo as any) || {};
  const dayColors = [
    themeColors.secondary,
    themeColors.tertiary,
    themeColors.quinary,
    themeColors.septenary,
    themeColors.senary,
  ];

  const speakerColors: Record<string, string> = {};
  speakers.forEach((s, i) => {
    let color = dayColors[i % dayColors.length];
    if (s.sessions && s.sessions.length > 0) {
      const dateStr = s.sessions[0].date;
      if (dateStr) {
        const date = new Date(dateStr);
        const dayIndex = date.getDay();
        let index = dayIndex - 1;
        if (index < 0) index = 0;
        if (index >= dayColors.length) index = index % dayColors.length;
        color = dayColors[index];
      }
    }
    speakerColors[s.id] = color;
  });

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sinfo-primary via-sinfo-primary to-sinfo-secondary py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Meet our Speakers
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              This year, SINFO brings together some of the most influential
              minds in technology and innovation. Meet the global voices that
              are shaping SINFO&apos;s excellence.
            </p>
          </div>
        </div>
      </section>

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
