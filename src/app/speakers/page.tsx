import React from "react";
import { createMetadata } from "@/lib/seo";
import BlankPageMessage from "@/components/BlankPageMessage";

export const metadata = createMetadata({
  title: "Speakers",
  description:
    "Meet the world-class speakers at SINFO — influential minds in technology and innovation shaping the future.",
  path: "/speakers",
  image: "/images/pages/current-speakers.jpg",
});
import { SpeakerService } from "@/services/SpeakerService";
import { EventService } from "@/services/EventService";
import { SessionService } from "@/services/SessionService";
import { buildSpeakerColorMap } from "@/utils/speakerColors";
import SpeakersFilterGrid from "@/components/Speakers/SpeakersFilterGrid";

export const dynamic = "force-dynamic";

export default async function CurrentSpeakersPage() {
  const event = await EventService.getLatest();
  const speakers = event ? await SpeakerService.getSpeakers() : [];
  const sessions = event ? await SessionService.getSessions() : [];

  if (!speakers || speakers.length === 0) {
    return <BlankPageMessage message="No current speakers found." />;
  }

  const eventSessions = (sessions ?? []).filter(
    (session) => String(session.event) === String(event?.id),
  );

  const getSpeakerId = (sessionSpeaker: Speaker | string) => {
    return typeof sessionSpeaker === "string"
      ? sessionSpeaker
      : sessionSpeaker?.id ||
          (sessionSpeaker as any)?.speaker ||
          (sessionSpeaker as any)?.speakerId ||
          (sessionSpeaker as any)?.speaker_id;
  };

  const sessionsBySpeakerId = new Map<string, SINFOSession[]>();
  const speakerFilterSessionsById: Record<
    string,
    { date: string; kind: string }[]
  > = {};

  eventSessions.forEach((session) => {
    session.speakers?.forEach((sessionSpeaker) => {
      const speakerId = getSpeakerId(sessionSpeaker);

      if (!speakerId) return;

      const existing = sessionsBySpeakerId.get(speakerId) ?? [];
      existing.push(session);
      sessionsBySpeakerId.set(speakerId, existing);

      const filterSessions = speakerFilterSessionsById[speakerId] ?? [];
      filterSessions.push({ date: session.date, kind: session.kind });
      speakerFilterSessionsById[speakerId] = filterSessions;
    });
  });

  const speakersWithSessions = speakers.map((speaker) => {
    const speakerSessions = [
      ...(sessionsBySpeakerId.get(speaker.id) ?? speaker.sessions ?? []),
    ].sort(
      (a, b) =>
        new Date(String(a.date)).getTime() - new Date(String(b.date)).getTime(),
    );

    return {
      ...speaker,
      sessions: speakerSessions,
    };
  });

  const speakerColors = await buildSpeakerColorMap(speakersWithSessions);

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
          <SpeakersFilterGrid
            speakers={speakers}
            speakerColors={speakerColors}
            speakerFilterSessionsById={speakerFilterSessionsById}
          />
        </div>
      </section>
    </main>
  );
}
