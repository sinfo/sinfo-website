"use client";

import React, { useEffect, useState } from "react";
import Carousel from "./CurrentSpeakersHighlight/Carousel";
import { SpeakerService } from "@/services/SpeakerService";
import { EventService } from "@/services/EventService";
import config from "../../../tailwind.config";

interface CurrentSpeakersHighlightProps {
  backgroundClass?: string;
}

export default function CurrentSpeakersHighlight({
  backgroundClass = "bg-white",
}: CurrentSpeakersHighlightProps) {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [speakerColors, setSpeakerColors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const event = await EventService.getLatest();
        if (!event) return; // Handle error appropriately

        // TODO: The event.id might need to be cast or checked based on API response structure. 
        // Assuming ID is present on the event object returned.
        const speakersData = await SpeakerService.getSpeakers({ event: event.id as unknown as number }); 
        
        if (speakersData) {
            // Process colors based on sessions
            const colorsMap: Record<string, string> = {};
            const themeColors = config.theme?.extend?.colors?.sinfo as any || {};
            
            // Map days to colors (Approximate logic, can be refined based on exact dates)
            // Assuming 5 days of event
            const dayColors = [
                themeColors.primary || "#1c2b70",   // Mon - Blue
                themeColors.secondary || "#bf2c21", // Tue - Red
                themeColors.tertiary || "#f1853a",  // Wed - Orange
                themeColors.quaternary || "#E0B485",// Thu - Gold
                themeColors.quinary || "#fcbd14",   // Fri - Yellow?
                themeColors.senary || "#c465a2"     // Sat/Extra
            ];

            speakersData.forEach(s => {
                let color = dayColors[0];
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
                colorsMap[s.id] = color;
            });

            setSpeakers(speakersData);
            setSpeakerColors(colorsMap);
        }
      } catch (error) {
        console.error("Failed to fetch speakers", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
        <div className={`flex w-full items-center justify-center py-20 ${backgroundClass}`}>
             <div className="h-10 w-10 animate-spin rounded-full border-4 border-sinfo-primary border-t-transparent"></div>
        </div>
    );
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
      
      <Carousel 
        speakers={speakers} 
        speakerColors={speakerColors} 
      />
    </section>
  );
}
