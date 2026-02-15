import { SessionService } from "@/services/SessionService";
import { EventService } from "@/services/EventService";
import BlankPageMessage from "@/components/BlankPageMessage";

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
    <main className="min-h-screen bg-gray-100">
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
            <div key={day} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-sinfo-primary sticky top-0 bg-gray-100 py-2 z-10">
                {day}
              </h2>

              <div className="space-y-4">
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
                        className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {session.name}
                            </h3>
                            <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-sinfo-primary/10 text-sinfo-primary rounded">
                              {session.kind}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                            {startTime.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            -{" "}
                            {endTime.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        <p className="text-gray-700 mb-4">
                          {session.description}
                        </p>

                        <div className="flex flex-wrap gap-4 items-center text-sm text-gray-600">
                          {session.speakers && session.speakers.length > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Speaker(s):</span>
                              <span>
                                {session.speakers.map((s) => s.name).join(", ")}
                              </span>
                            </div>
                          )}
                          {session.place && (
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Location:</span>
                              <span>{session.place}</span>
                            </div>
                          )}
                          {session.company && (
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Company:</span>
                              <span>{session.company.name}</span>
                            </div>
                          )}
                        </div>

                        {session.tickets?.needed && (
                          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800">
                            Tickets required for this session
                            {session.tickets.max &&
                              ` (Max: ${session.tickets.max})`}
                          </div>
                        )}
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
