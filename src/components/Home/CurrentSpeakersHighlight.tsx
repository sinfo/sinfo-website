import React from "react";
import Link from "next/link";
import Carousel from "./CurrentSpeakersHighlight/Carousel";
import { SpeakerService } from "@/services/SpeakerService";
import { EventService } from "@/services/EventService";
import config from "../../../tailwind.config";

export const dynamic = "force-dynamic";

interface CurrentSpeakersHighlightProps {
  backgroundClass?: string;
}

export default async function CurrentSpeakersHighlight({
  backgroundClass = "bg-white",
}: CurrentSpeakersHighlightProps) {
  let speakers: Speaker[] = [];
  let speakerColors: Record<string, string> = {};

  try {
    const event = await EventService.getLatest();
    if (event) {
      const speakersData = await SpeakerService.getSpeakers({
        event: event.id as unknown as number,
      });

      if (speakersData) {
        speakers = speakersData;

        // Process colors based on sessions
        const themeColors = (config.theme?.extend?.colors?.sinfo as any) || {};

        // Map days to colors (Approximate logic, can be refined based on exact dates)
        // Assuming 5 days of event
        const dayColors = [
          themeColors.secondary, // Mon
          themeColors.tertiary, // Tue
          themeColors.quinary, // Wed
          themeColors.septenary, // Thu
          themeColors.senary, // Fri
        ];

        speakersData.forEach((s, i) => {
          let color = dayColors[i % dayColors.length]; // Default color based on index
          if (s.sessions && s.sessions.length > 0) {
            const dateStr = s.sessions[0].date;
            if (dateStr) {
              const date = new Date(dateStr);
              const dayIndex = date.getDay(); // 0-6 (Sun-Sat). Mon is 1.
              // Map Mon(1) -> 0, Tue(2) -> 1, ...
              let index = dayIndex - 1;
              if (index < 0) index = 0; // Fallback for Sunday or items without proper date
              if (index >= dayColors.length) index = index % dayColors.length;

              color = dayColors[index];
            }
          }
          speakerColors[s.id] = color;
        });
      }
    }
  } catch (error) {
    console.error("Failed to fetch speakers", error);
  }

  if (speakers.length === 0) return null;

  return (
    <section className={`w-full py-10 md:py-20 ${backgroundClass}`}>
      <div className="container mx-auto px-6 mb-8 md:mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-sinfo-primary">
          Meet the Speakers
        </h2>
        <p className="mt-2 md:mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the visionaries joining us for this edition.
        </p>
      </div>

      <Carousel speakers={speakers} speakerColors={speakerColors} />

      <div className="container mx-auto px-6 mt-8 flex justify-center gap-4">
        <Link
          href="/speakers/previous"
          className="px-6 py-3 border border-sinfo-primary text-sinfo-primary rounded-md font-semibold hover:bg-sinfo-primary/10 transition"
        >
          Previous speakers
        </Link>

        <Link
          href="/speakers"
          className="px-6 py-3 bg-sinfo-primary text-white rounded-md font-semibold hover:opacity-95 transition"
        >
          Current speakers
        </Link>
      </div>
    </section>
  );
}
