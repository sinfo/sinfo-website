import { createMetadata } from "@/lib/seo";
import { SessionService } from "@/services/SessionService";
import { EventService } from "@/services/EventService";
import BlankPageMessage from "@/components/BlankPageMessage";
import SessionCard from "@/components/SessionCard";
import ScheduleDaysNav from "@/components/ScheduleDaysNav";
import {
  attachQnaSessions,
  getDayId,
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
  const dayItems = dayEntries.map(([day]) => ({
    day,
    id: getDayId(day),
  }));

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
              <ScheduleDaysNav dayItems={dayItems} />
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {attachQnaSessions(
                        daySessions.sort(
                          (a, b) =>
                            new Date(a.date).getTime() -
                            new Date(b.date).getTime(),
                        ),
                      ).map(({ session, qna }) => (
                        <SessionCard
                          key={session.id}
                          session={session}
                          qna={qna}
                        />
                      ))}
                    </div>
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
