import React from "react";
import Link from "next/link";
import { SpeakerService } from "@/services/SpeakerService";
import {
  generateTimeInterval,
  getEventDay,
  getEventMonth,
} from "@/utils/utils";
import ImageWithFallback from "@/components/ImageWithFallback";

export const dynamic = "force-dynamic";

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
    <main className="w-full min-h-screen bg-sinfo-primary relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute left-0 bottom-0 w-28 h-28 md:w-40 md:h-40 bg-sinfo-tertiary rounded-tr-full z-10" />
      <div className="absolute right-0 bottom-0 w-28 h-28 md:w-40 md:h-40 bg-sinfo-secondary rounded-tl-full z-10" />

      {/* Glowing line separator - positioned where circles end */}
      <div className="absolute bottom-0 md:bottom-0 left-0 right-0 z-[5]">
        <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        {/* Top decorative elements - only visible on desktop */}
        <div className="hidden md:block absolute top-4 right-8 md:top-6 md:right-16 z-20">
          <ImageWithFallback
            src="/images/decorative-images/star.png"
            alt="Decorative star"
            width={120}
            height={120}
            className="w-24 h-24 md:w-28 md:h-28"
          />
        </div>

        {/* Main grid */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 md:items-start">
          {/* Mobile layout - custom order */}
          <div className="md:hidden space-y-8 relative">
            {/* 1. Name and title */}
            <div>
              <h1 className="text-6xl font-black uppercase leading-[0.85] tracking-tight text-white">
                {speaker.name}
              </h1>
              {(speaker.title || speaker.company?.name) && (
                <p className="mt-4 text-sinfo-tertiary text-xl font-bold">
                  {speaker.title}
                </p>
              )}
            </div>

            {/* Star decoration after title, before photo */}
            <div className="flex justify-end -mb-14">
              <ImageWithFallback
                src="/images/decorative-images/star.png"
                alt="Decorative star"
                width={80}
                height={80}
                className="w-24 h-24"
              />
            </div>

            {/* 2. Photo with decorative elements */}
            <div className="space-y-8 relative -mt-14">
              {/* Speaker photo with yellow background */}
              <div className="relative flex justify-center h-80">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-sinfo-quinary rounded-full overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src={speaker.img}
                    alt={speaker.name}
                    className="absolute inset-0 w-full h-full object-contain"
                    sizes="100vw"
                    width={380}
                    height={380}
                  />
                </div>
              </div>

              {/* Small decorative box */}
              <div className="max-w-[180px] -mt-9">
                <ImageWithFallback
                  src="/images/decorative-images/redElement.png"
                  alt="Decorative element"
                  width={140}
                  height={140}
                  className="w-28 h-28"
                />
              </div>
            </div>

            {/* 3. Description box */}
            <div className="bg-sinfo-light rounded-lg p-8 text-black flex items-center relative">
              <p className="text-base font-bold leading-relaxed whitespace-pre-line">
                {speaker.description || "Texto texto bla bla"}
              </p>
            </div>

            {/* 4. Session title box */}
            {(mainSession?.name || mainSession?.title) && (
              <div className="bg-sinfo-primary border-4 border-white rounded-lg p-6 shadow-xl w-fit">
                <p className="text-sinfo-quinary font-black uppercase text-2xl leading-tight">
                  {(mainSession.name || mainSession.title) as string}
                </p>
              </div>
            )}

            {/* 5. Session info */}
            {mainSession && (
              <div className="text-white">
                <p className="font-bold text-xl">
                  {mainSession.place || "Main Stage"}
                </p>
                <p className="text-lg">
                  {formattedDate || "February 17"} • {timeRange || "16h30-17h20"}
                </p>
              </div>
            )}
          </div>

          {/* Desktop layout - original two columns */}
          <div className="hidden md:block space-y-8">
            {/* Name */}
            <div>
              <h1 className="text-7xl lg:text-8xl font-black uppercase leading-[0.85] tracking-tight text-white">
                {speaker.name}
              </h1>
              {(speaker.title || speaker.company?.name) && (
                <p className="mt-4 text-sinfo-tertiary text-2xl font-bold">
                  {speaker.title}
                </p>
              )}
            </div>

            {/* Description box with light background */}
            <div className="bg-sinfo-light rounded-lg p-10 text-black flex items-center">
              <p className="text-lg font-bold leading-relaxed whitespace-pre-line">
                {speaker.description || "Texto texto bla bla"}
              </p>
            </div>

            {/* Session info */}
            {mainSession && (
              <div className="text-white">
                <p className="font-bold text-2xl">
                  {mainSession.place || "Main Stage"}
                </p>
                <p className="text-xl">
                  {formattedDate || "February 17"} • {timeRange || "16h30-17h20"}
                </p>
              </div>
            )}
          </div>

          {/* Desktop right column - Photo and session title */}
          <div className="hidden md:block space-y-8 relative">
            {/* Speaker photo with yellow background */}
            <div className="relative flex justify-center h-[340px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-1/2 w-[380px] h-[380px] bg-sinfo-quinary rounded-full overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={speaker.img}
                  alt={speaker.name}
                  className="absolute inset-0 w-full h-full object-contain"
                  sizes="50vw"
                  width={380}
                  height={380}
                />
              </div>
            </div>

            {/* Decorative plus */}
            <div className="absolute right-8 top-1/2 w-20 h-20">
              <span className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-white -translate-x-1/2" />
              <span className="absolute top-1/2 left-0 right-0 h-[4px] bg-white -translate-y-1/2" />
            </div>

            {/* Small decorative box */}
            <div className="max-w-[180px] -mt-9">
              <ImageWithFallback
                src="/images/decorative-images/redElement.png"
                alt="Decorative element"
                width={140}
                height={140}
                className="w-32 h-32"
              />
            </div>

            {/* Session title box */}
            {(mainSession?.name || mainSession?.title) && (
              <div className="bg-sinfo-primary border-4 border-white rounded-lg p-6 shadow-xl w-fit">
                <p className="text-sinfo-quinary font-black uppercase text-3xl leading-tight">
                  {(mainSession.name || mainSession.title) as string}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA button */}
        <div className="mt-12 md:mt-16 flex justify-center relative z-10">
          <Link
            href="/speakers"
            className="bg-sinfo-senary text-sinfo-primary font-black py-5 px-16 md:py-6 md:px-20 rounded-full text-xl md:text-2xl uppercase shadow-2xl hover:opacity-90 transition-opacity"
          >
            SEE ALL SPEAKERS
          </Link>
        </div>
      </div>
    </main>
  );
}