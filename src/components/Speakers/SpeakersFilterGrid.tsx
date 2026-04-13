"use client";

import { useMemo, useState } from "react";
import SpeakerCard from "@/components/Home/CurrentSpeakersHighlight/SpeakerCard";
import { getDayColorForDate, SINFO_PRIMARY_COLOR } from "@/utils/speakerColors";

type SpeakersFilterGridProps = {
  speakers: Speaker[];
  speakerColors: Record<string, string>;
  speakerFilterSessionsById: Record<string, { date: string; kind: string }[]>;
};

const ALL_DAYS = "__ALL_DAYS__";

type DayOption = {
  key: string;
  label: string;
  timestamp: number;
};

function isFilterableSession(session: { date: string; kind: string }) {
  return !session.kind?.toLowerCase().includes("q&a");
}

function toDayInfo(dateValue: string): DayOption | null {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayKey = `${year}-${month}-${day}`;

  return {
    key: dayKey,
    timestamp: new Date(year, date.getMonth(), date.getDate()).getTime(),
    label: date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
  };
}

export default function SpeakersFilterGrid({
  speakers,
  speakerColors,
  speakerFilterSessionsById,
}: SpeakersFilterGridProps) {
  const [selectedDay, setSelectedDay] = useState<string>(ALL_DAYS);

  const { dayOptions, speakerDayKeys } = useMemo(() => {
    const dayMap = new Map<string, DayOption>();
    const speakerDays = new Map<string, Set<string>>();

    speakers.forEach((speaker) => {
      const dayKeys = new Set<string>();
      const speakerSessions = speakerFilterSessionsById[speaker.id] ?? [];

      speakerSessions.forEach((session) => {
        if (!isFilterableSession(session)) return;
        const day = toDayInfo(session.date);
        if (!day) return;

        dayKeys.add(day.key);

        if (!dayMap.has(day.key)) {
          dayMap.set(day.key, day);
        }
      });

      speakerDays.set(speaker.id, dayKeys);
    });

    return {
      dayOptions: Array.from(dayMap.values()).sort(
        (a, b) => a.timestamp - b.timestamp,
      ),
      speakerDayKeys: speakerDays,
    };
  }, [speakers, speakerFilterSessionsById]);

  const selectedDayColor = useMemo(() => {
    if (selectedDay === ALL_DAYS) return null;
    const selectedOption = dayOptions.find((day) => day.key === selectedDay);
    if (!selectedOption) return null;
    return getDayColorForDate(new Date(selectedOption.timestamp));
  }, [dayOptions, selectedDay]);

  const filteredSpeakers = useMemo(() => {
    if (selectedDay === ALL_DAYS) {
      return speakers;
    }

    return speakers.filter((speaker) => {
      const dayKeys = speakerDayKeys.get(speaker.id);
      return dayKeys?.has(selectedDay) ?? false;
    });
  }, [speakers, selectedDay, speakerDayKeys]);

  return (
    <>
      <div className="mb-8 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-sinfo-primary/80 mb-3">
            Filter by day
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedDay(ALL_DAYS)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                selectedDay === ALL_DAYS
                  ? "border-sinfo-primary bg-sinfo-primary text-white"
                  : "border-sinfo-primary/20 bg-white text-sinfo-primary hover:border-sinfo-primary/50"
              }`}
            >
              All days
            </button>
            {dayOptions.map((day) => (
              <button
                key={day.key}
                type="button"
                onClick={() => setSelectedDay(day.key)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  selectedDay === day.key
                    ? "border-sinfo-primary bg-sinfo-primary text-white"
                    : "border-sinfo-primary/20 bg-white text-sinfo-primary hover:border-sinfo-primary/50"
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredSpeakers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-sinfo-primary/30 bg-sinfo-light/40 p-8 text-center">
          <p className="text-sinfo-primary font-semibold mb-2">
            No speakers found for the selected day.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedDay(ALL_DAYS);
            }}
            className="text-sm font-medium text-sinfo-primary underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {filteredSpeakers.map((speaker) => (
            <div key={speaker.id}>
              <SpeakerCard
                speaker={speaker}
                color={
                  selectedDayColor ??
                  speakerColors[speaker.id] ??
                  SINFO_PRIMARY_COLOR
                }
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
