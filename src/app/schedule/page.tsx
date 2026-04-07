import { createMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Schedule",
  description:
    "Check out the SINFO event schedule — talks, workshops, panels, and more.",
  path: "/schedule",
  image: "/images/pages/schedule.jpg",
});
import { SessionService } from "@/services/SessionService";
import { EventService } from "@/services/EventService";
import BlankPageMessage from "@/components/BlankPageMessage";
import { ShowMore } from "@/components/ShowMore";
import ImageWithFallback from "@/components/ImageWithFallback";

export const dynamic = "force-dynamic";

function groupSessionsByDay(sessions: SINFOSession[]) {
  return sessions.reduce(
    (acc, session) => {
      const date = new Date(session.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(session);
      return acc;
    },
    {} as Record<string, SINFOSession[]>,
  );
}

function getEndTime(session: SINFOSession): Date {
  const startTime = new Date(session.date);
  const endTime = new Date(startTime.getTime() + session.duration * 60000);
  return endTime;
}

export default async function SchedulePage() {
  const event = await EventService.getLatest();
  const sessions = event ? await SessionService.getSessions() : [];

  if (!sessions || sessions.length === 0) {
    return <BlankPageMessage message="No sessions available at the moment." />;
  }

  const sessionsByDay = groupSessionsByDay(sessions);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sinfo-primary via-sinfo-primary to-sinfo-secondary py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Schedule
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Check out the complete schedule for all SINFO sessions, workshops,
              and presentations.
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(sessionsByDay).map(([day, daySessions]) => (
            <div key={day}>
              <h2 className="sticky top-14 md:top-16 lg:top-20 z-20 text-2xl sm:text-3xl font-bold mb-6 text-gray-900 bg-gray-50 py-2 shadow-sm">
                {day}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {daySessions
                  .sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime(),
                  )
                  .map((session) => {
                    const startTime = new Date(session.date);
                    const endTime = getEndTime(session);

                    return (
                      <div
                        key={session.id}
                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-200"
                      >
                        {/* Badge */}
                        <div className="px-4 pt-4">
                          <span className="inline-block px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-full">
                            {session.kind}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                            {session.name}
                          </h3>

                          <div className="text-sm text-gray-600 mb-3 space-y-1">
                            <div className="flex items-start gap-2">
                              <span className="font-medium">
                                {new Date(session.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                  },
                                )}
                              </span>
                              <span>•</span>
                              <span>
                                {startTime.toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                })}{" "}
                                -{" "}
                                {endTime.toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </span>
                            </div>
                            {session.place && (
                              <div className="text-gray-700 font-medium">
                                {session.place}
                              </div>
                            )}
                          </div>

                          {/* Description with ShowMore */}
                          <ShowMore
                            lines={3}
                            className="text-sm text-gray-700 mb-4"
                          >
                            {session.description}
                          </ShowMore>

                          {/* Speakers */}
                          {session.speakers && session.speakers.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex items-center gap-3 flex-wrap">
                                {session.speakers.map((speaker) => (
                                  <div
                                    key={speaker.id}
                                    className="flex flex-col items-center"
                                  >
                                    {speaker.img ? (
                                      <div className="relative w-12 h-12 rounded-full overflow-hidden mb-1 bg-gray-200">
                                        <ImageWithFallback
                                          src={speaker.img}
                                          alt={speaker.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                    ) : (
                                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sinfo-primary to-sinfo-secondary flex items-center justify-center text-white font-bold mb-1">
                                        {speaker.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")
                                          .substring(0, 2)
                                          .toUpperCase()}
                                      </div>
                                    )}
                                    <span className="text-xs text-gray-700 font-medium text-center max-w-[80px] truncate">
                                      {speaker.name}
                                    </span>
                                    {speaker.title && (
                                      <span className="text-xs text-gray-500 text-center max-w-[80px] truncate">
                                        {speaker.title}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Company Badge */}
                          {session.company && (
                            <div className="mt-3">
                              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                {session.company.name}
                              </span>
                            </div>
                          )}

                          {/* Tickets Warning */}
                          {session.tickets?.needed && (
                            <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
                              Tickets required
                              {session.tickets.max &&
                                ` (Max: ${session.tickets.max})`}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
