import React from "react";
import Link from "next/link";
import { SpeakerService } from "@/services/SpeakerService";
import {
  generateTimeInterval,
  getEventDay,
  getEventMonth,
} from "@/utils/utils";
import ImageWithFallback from "@/components/ImageWithFallback";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const speaker = await SpeakerService.getSpeaker(params.id);
  return {
    title: speaker ? `${speaker.name} • SINFO` : "Speaker • SINFO",
    description: speaker?.description || "Speaker details",
    openGraph: speaker
      ? {
          images: speaker.img ? [speaker.img] : undefined,
        }
      : undefined,
  } as any;
}

export default async function Page({ params }: Props) {
  const { id } = params;
  const speaker = await SpeakerService.getSpeaker(id);

  if (!speaker) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Speaker not found</h2>
          <p className="text-sm text-gray-600 mb-6">
            We couldn&apos;t find the speaker you&apos;re looking for.
          </p>
          <Link
            href="/speakers"
            className="inline-block bg-sinfo-primary text-white px-4 py-2 rounded"
          >
            See all speakers
          </Link>
        </div>
      </div>
    );
  }

  const mainSession: any | undefined = speaker.sessions?.[0];
  const formattedDate = mainSession?.date
    ? `${getEventMonth(mainSession.date, false)} ${getEventDay(mainSession.date)}`
    : undefined;
  const timeRange = mainSession?.date
    ? generateTimeInterval(mainSession.date, mainSession?.duration ?? 0, {
        onlyHours: true,
      })
    : undefined;

  return (
    <main className="w-full">
      <section className="bg-sinfo-primary text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 md:py-12">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-2">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-[0.9] tracking-tighter">
                {speaker.name}
              </h1>
              {(speaker.title || speaker.company?.name) && (
                <p className="mt-4 text-sinfo-tertiary text-lg md:text-xl font-semibold">
                  {speaker.title}
                  {speaker.company?.name ? ` @${speaker.company.name}` : ""}
                </p>
              )}
            </div>

            <div className="relative flex items-start justify-center md:justify-end">
              {/* yellow pod with portrait */}
              <div className="relative w-56 h-56 md:w-64 md:h-64 bg-sinfo-quinary rounded-[56px] rounded-tl-[120px] overflow-hidden shadow-lg">
                <ImageWithFallback
                  src={speaker.img}
                  alt={speaker.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  width={250}
                  height={250}
                />
              </div>
            </div>
          </div>

          {/* Content row */}
          <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
            {/* big text block */}
            <div className="md:col-span-2 bg-white rounded-lg p-4 md:p-6">
              <div className="bg-gray-200 rounded-md p-6 md:p-10 text-black min-h-[260px] flex items-center">
                <p className="text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {speaker.description}
                </p>
              </div>
            </div>

            {/* right decorations and talk title */}
            <div className="relative">
              {/* plus icon */}
              <div className="hidden md:block absolute right-4 top-24 w-10 h-10">
                <span className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-400 -translate-x-1/2" />
                <span className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-400 -translate-y-1/2" />
              </div>

              {/* talk title */}
              {(mainSession?.name || mainSession?.title) && (
                <div className="mt-6 md:mt-24">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sinfo-quinary font-extrabold uppercase text-xl leading-snug">
                      {(mainSession.name || mainSession.title) as string}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom band with session info */}
          {(mainSession || true) && (
            <div className="mt-8 md:mt-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-end">
                <div className="md:col-span-2">
                  <div className="text-sm md:text-base">
                    {mainSession?.place && (
                      <p className="font-bold">{mainSession.place}</p>
                    )}
                    {mainSession?.date && (
                      <p>
                        {formattedDate} • {timeRange}
                      </p>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex justify-center md:justify-end">
                  <Link
                    href="/speakers"
                    className="bg-sinfo-senary text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-full text-lg md:text-xl uppercase shadow-lg hover:opacity-90 transition"
                  >
                    See all speakers
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
