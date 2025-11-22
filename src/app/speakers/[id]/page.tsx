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

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        {/* Top decorative elements */}
        <div className="absolute top-4 right-8 md:top-6 md:right-16 z-20">
          <ImageWithFallback
            src="/images/decorative-images/star.png"
            alt="Decorative star"
            width={120}
            height={120}
            className="w-24 h-24 md:w-28 md:h-28"
          />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left column - Name and description */}
          <div className="space-y-8">
            {/* Name */}
            <div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.85] tracking-tight text-white">
                {speaker.name}
              </h1>
              {speaker.title && (
                <p className="mt-4 text-sinfo-tertiary text-xl md:text-2xl font-bold">
                  {speaker.title}
                </p>
              )}
            </div>

            {/* Description box with light background */}
            <div className="bg-sinfo-light rounded-lg p-8 md:p-10 text-black min-h-[300px] md:min-h-[350px] flex items-center md:mr-[-27px]">
              <p className="text-base md:text-lg font-bold leading-relaxed whitespace-pre-line">
                {speaker.description || "Texto texto bla bla"}
              </p>
            </div>

            {/* Session info */}
            {mainSession && (
              <div className="text-white">
                <p className="font-bold text-xl md:text-2xl">
                  {mainSession.place || "Main Stage"}
                </p>
                <p className="text-lg md:text-xl">
                  {formattedDate || "February 17"} • {timeRange || "16h30-17h20"}
                </p>
              </div>
            )}
          </div>

          {/* Right column - Photo and session title */}
          <div className="space-y-8 relative">
            {/* White background rectangle - right side only */}
            <div className="absolute top-[272px] right-0 w-[111%] h-[400px] md:h-[270px] bg-sinfo-light rounded-lg z-0" />
            
            {/* Speaker photo with yellow background */}
            <div className="relative flex justify-center md:justify-center h-80 md:h-[340px] z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-x-[60%] w-[340px] h-[340px] md:w-[380px] md:h-[380px] bg-sinfo-quinary rounded-full overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={speaker.img}
                  alt={speaker.name}
                  className="absolute inset-0 w-full h-full object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  width={380}
                  height={380}
                />
              </div>
            </div>

            {/* Decorative plus */}
            <div className="hidden md:block absolute right-8 top-[60%] w-20 h-20">
              <span className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-black -translate-x-1/2" />
              <span className="absolute top-1/2 left-0 right-0 h-[4px] bg-black -translate-y-1/2" />
            </div>

            {/* Small decorative box */}
            <div className="max-w-[180px] -mt-9 relative z-10">
              <ImageWithFallback
                src="/images/decorative-images/redElement.png"
                alt="Decorative element"
                width={140}
                height={140}
                className="w-28 h-28 md:w-32 md:h-32"
              />
            </div>

            {/* Session title box */}
            {(mainSession?.name || mainSession?.title) && (
              <div className="bg-sinfo-primary border-4 border-white rounded-lg p-6 shadow-xl">
                <p className="text-sinfo-quinary font-black uppercase text-2xl md:text-3xl leading-tight">
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
