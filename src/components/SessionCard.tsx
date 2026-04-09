import ImageWithFallback from "@/components/ImageWithFallback";
import { ShowMore } from "@/components/ShowMore";
import { Calendar, MapPin } from "lucide-react";

function getEndTime(session: SINFOSession): Date {
  const startTime = new Date(session.date);
  return new Date(startTime.getTime() + session.duration * 60000);
}

const KIND_CHIP: Record<string, string> = {
  keynote: "bg-sinfo-secondary/15 text-sinfo-secondary",
  "connect stage": "bg-sinfo-secondary/15 text-sinfo-secondary",
  presentation: "bg-sinfo-tertiary/15 text-sinfo-tertiary",
  workshop: "bg-sinfo-quinary/25 text-amber-600",
  panel: "bg-sinfo-senary/15 text-sinfo-senary",
};

function getKindChipClass(kind: string): string {
  const key = kind?.toLowerCase() ?? "";
  for (const [pattern, cls] of Object.entries(KIND_CHIP)) {
    if (key.includes(pattern)) return cls;
  }
  return "bg-gray-100 text-gray-600";
}

export default function SessionCard({
  session,
  qna,
}: {
  session: SINFOSession;
  qna?: SINFOSession;
}) {
  const startTime = new Date(session.date);
  const endTime = getEndTime(session);
  const qnaEndTime = qna ? getEndTime(qna) : null;

  const isKeynote =
    session.kind?.toLowerCase().includes("keynote") ||
    session.kind?.toLowerCase().includes("connect stage");
  const isPresentation = ["presentation", "workshop"].includes(
    session.kind?.toLowerCase(),
  );
  const speakers = session.speakers ?? [];
  const firstSpeaker =
    isKeynote && speakers.length > 1 ? undefined : speakers[0];

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-200">
      <div className="p-4 flex gap-4 h-full">
        {/* Left: Company logo for presentations, speaker avatar otherwise */}
        {(isPresentation && session.company?.img) || firstSpeaker ? (
          <div className="flex-shrink-0">
            {isPresentation && session.company?.img ? (
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center p-1">
                <ImageWithFallback
                  src={session.company.img}
                  alt={session.company.name}
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
            ) : firstSpeaker?.img ? (
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                <ImageWithFallback
                  src={firstSpeaker.img}
                  alt={firstSpeaker.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sinfo-primary to-sinfo-secondary flex items-center justify-center text-white font-bold">
                {firstSpeaker!.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()}
              </div>
            )}
          </div>
        ) : null}

        {/* Right: Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-lg ${getKindChipClass(session.kind)}`}
            >
              {session.kind}
            </span>
          </div>

          <h3 className="text-base font-bold text-gray-900 leading-tight mb-2">
            {session.name}
          </h3>

          <div className="text-xs text-gray-600 mb-2 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <Calendar size={12} className="text-gray-400 flex-shrink-0" />
              <span className="font-medium">
                {new Date(session.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
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
              <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                {session.place}
              </div>
            )}
          </div>

          <ShowMore lines={3} className="text-sm text-gray-700 mb-2">
            {session.description}
          </ShowMore>

          {/* Additional speakers (non-keynote with multiple speakers) */}
          {!isKeynote && speakers.length > 1 && (
            <div className="flex items-center gap-2 flex-wrap mt-2">
              {speakers.slice(1).map((speaker) => (
                <div key={speaker.id} className="flex items-center gap-1">
                  {speaker.img ? (
                    <div className="relative w-6 h-6 rounded-full overflow-hidden bg-gray-200">
                      <ImageWithFallback
                        src={speaker.img}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sinfo-primary to-sinfo-secondary flex items-center justify-center text-white text-[10px] font-bold">
                      {speaker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs text-gray-600">{speaker.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* All speakers at bottom for multi-speaker keynotes */}
          {isKeynote && speakers.length > 1 && (
            <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
              {speakers.map((speaker) => (
                <div key={speaker.id} className="flex items-center gap-2">
                  {speaker.img ? (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <ImageWithFallback
                        src={speaker.img}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sinfo-primary to-sinfo-secondary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {speaker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-gray-800 truncate">
                      {speaker.name}
                    </div>
                    {speaker.title && (
                      <div className="text-xs text-gray-500 truncate">
                        {speaker.title}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Company Badge */}
          {session.company && (
            <div className="mt-2">
              <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
                {session.company.name}
              </span>
            </div>
          )}

          {/* Single speaker chip */}
          {speakers.length === 1 && (
            <div className="mt-2">
              <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
                {speakers[0].name}
              </span>
            </div>
          )}

          {/* Tickets Warning */}
          {session.tickets?.needed && (
            <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
              Tickets required
              {session.tickets.max && ` (Max: ${session.tickets.max})`}
            </div>
          )}

          {/* Q&A */}
          {qna && qnaEndTime && (
            <div className="mt-auto">
              <div className="mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Q&A
                </span>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                  <Calendar size={10} className="text-gray-400 flex-shrink-0" />
                  <span>
                    {new Date(qna.date).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    -{" "}
                    {qnaEndTime.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                  {qna.place && (
                    <>
                      <span>·</span>
                      <MapPin
                        size={10}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <span>{qna.place}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
