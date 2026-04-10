import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { SessionService } from "@/services/SessionService";
import { EventService } from "@/services/EventService";
import BlankPageMessage from "@/components/BlankPageMessage";
import SessionCard from "@/components/SessionCard";
import {
  attachQnaSessions,
  getDayId,
  groupByKind,
  groupSessionsByDay,
} from "@/utils/scheduleHelpers";

export const metadata = createMetadata({
  title: "Schedule",
  description:
    "Check out the SINFO event schedule — talks, workshops, panels, and more.",
  path: "/schedule",
  image: "/images/pages/schedule.jpg",
});

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const event = await EventService.getLatest();
  const sessions = event ? await SessionService.getSessions() : [];

  if (!sessions || sessions.length === 0) {
    return <BlankPageMessage message="No sessions available at the moment." />;
  }

  const sessionsByDay = groupSessionsByDay(sessions);
  const dayEntries = Object.entries(sessionsByDay);

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
          <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <aside className="hidden lg:block">
              <div className="sticky top-20">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Days
                  </p>
                  <nav className="space-y-2">
                    {dayEntries.map(([day]) => {
                      const dayId = getDayId(day);
                      return (
                        <Link
                          key={dayId}
                          href={`#${dayId}`}
                          className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        >
                          {day}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </aside>

            <div className="space-y-12">
              {dayEntries.map(([day, daySessions]) => {
                const dayId = getDayId(day);
                return (
                  <div
                    key={day}
                    id={dayId}
                    className="scroll-mt-28 md:scroll-mt-32 lg:scroll-mt-40"
                  >
                    <h2 className="sticky top-14 md:top-16 lg:top-20 z-20 text-2xl sm:text-3xl font-bold mb-6 text-gray-900 bg-gray-50 py-2 shadow-sm">
                      {day}
                    </h2>

                    {groupByKind(
                      attachQnaSessions(
                        daySessions.sort(
                          (a, b) =>
                            new Date(a.date).getTime() -
                            new Date(b.date).getTime(),
                        ),
                      ),
                    ).map((group, i) => (
                      <div key={i}>
                        {i > 0 && <hr className="my-8 border-gray-200" />}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {group.map(({ session, qna }) => (
                            <SessionCard
                              key={session.id}
                              session={session}
                              qna={qna}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
