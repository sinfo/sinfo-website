import React from "react";
import Link from "next/link";
import { SpeakerService } from "@/services/SpeakerService";
import { SessionService } from "@/services/SessionService";
import { generateTimeInterval } from "@/utils/utils";
import ImageWithFallback from "@/components/ImageWithFallback";
import { Calendar, Clock, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const { id } = params;
  const speaker = await SpeakerService.getSpeaker(id);
  const session = await SessionService.getSessionBySpeaker(id);

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

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sinfo-primary via-sinfo-primary to-sinfo-secondary py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Speakers
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Meet the global voices that are shaping SINFO&apos;s excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column - Info */}
            <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {speaker.name}
              </h1>
              <h2 className="text-xl md:text-2xl text-sinfo-primary font-medium mb-8">
                {speaker.title}
                {speaker.company?.name && (
                  <span className="text-gray-500">
                    , {speaker.company.name}
                  </span>
                )}
              </h2>

              <div className="prose prose-lg text-gray-600 max-w-none mb-12 whitespace-pre-line">
                {speaker.description}
              </div>

              {/* Sessions */}
              {speaker.sessions && speaker.sessions.length > 0 && (
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-2xl font-bold text-sinfo-primary mb-6">
                    Sessions
                  </h3>
                  <div className="space-y-6">
                    {speaker.sessions.map((session) => {
                      const dateStr = session.date
                        ? new Date(session.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "";
                      const timeStr = session.date
                        ? generateTimeInterval(
                            session.date,
                            session.duration || 0,
                            { onlyHours: true },
                          )
                        : "";

                      return (
                        <div
                          key={session.id}
                          className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm font-semibold text-sinfo-secondary mb-3">
                            {session.date && (
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                <span>{dateStr}</span>
                              </div>
                            )}
                            {timeStr && (
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                <span>{timeStr}</span>
                              </div>
                            )}
                            {session.place && (
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" />
                                <span>{session.place}</span>
                              </div>
                            )}
                          </div>
                          <h4 className="text-xl font-bold text-gray-900">
                            {session.name}
                          </h4>
                          {session.description && (
                            <p className="mt-2 text-gray-600 whitespace-pre-line">
                              {session.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Image */}
            <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2">
              <div className="relative aspect-square w-full max-w-md mx-auto rounded-full overflow-hidden shadow-xl bg-gray-200">
                <ImageWithFallback
                  src={speaker.img}
                  alt={speaker.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link
              href="/speakers"
              className="inline-flex items-center px-6 py-3 bg-sinfo-primary text-white rounded-lg font-semibold hover:opacity-95 transition"
            >
              &larr; Back to all speakers
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
