import React from "react";
import Link from "next/link";
import Carousel from "./CurrentSpeakersHighlight/Carousel";
import { SpeakerService } from "@/services/SpeakerService";
import { EventService } from "@/services/EventService";
import { buildSpeakerColorMap } from "@/utils/speakerColors";

export const dynamic = "force-dynamic";

interface CurrentSpeakersHighlightProps {
  backgroundClass?: string;
}

export default async function CurrentSpeakersHighlight({
  backgroundClass = "bg-white",
}: CurrentSpeakersHighlightProps) {
  let speakers: Speaker[] | null = null;
  let speakerColors: Record<string, string> = {};

  try {
    const event = await EventService.getLatest();
    if (event) {
      const speakersData = await SpeakerService.getSpeakers();
      if (speakersData) {
        speakers = speakersData;
        speakerColors = await buildSpeakerColorMap(speakersData as any);
      }
    }
  } catch (error) {
    console.error("Failed to fetch speakers", error);
  }

  if (speakers === null) return null;
  const hasSpeakers = speakers.length > 0;

  speakers = hasSpeakers
    ? speakers
    : await SpeakerService.getSpeakers({ previousEdition: true });

  if (!speakers?.length) return null;

  return (
    <section className={`w-full py-10 md:py-20 ${backgroundClass}`}>
      <div className="container mx-auto px-6 mb-8 md:mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-sinfo-primary">
          {hasSpeakers ? "Meet the Speakers" : "Meet the Past Speakers"}
        </h2>
        <p className="mt-2 md:mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          {hasSpeakers ? (
            <>Discover the visionaries joining us for this edition.</>
          ) : (
            <>
              This edition’s speakers are yet to be announced. In the meantime,
              discover the voices that have taken the SINFO stage in past
              editions.
            </>
          )}
        </p>
      </div>
      <Carousel speakers={speakers} speakerColors={speakerColors} />
      <div className="container mx-auto px-6 mt-8 flex justify-center gap-4">
        <Link
          href="/speakers/previous"
          className={`px-6 py-3 rounded-md font-semibold transition ${hasSpeakers ? "border border-sinfo-primary text-sinfo-primary hover:bg-sinfo-primary/10" : "bg-sinfo-primary text-white hover:opacity-95"}"`}
        >
          Previous speakers
        </Link>

        {hasSpeakers && (
          <Link
            href="/speakers"
            className="px-6 py-3 rounded-md font-semibold transition bg-sinfo-primary text-white hover:opacity-95"
          >
            Current speakers
          </Link>
        )}
      </div>
    </section>
  );
}
