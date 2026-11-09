import { sinfoColors } from "@/constants/colors";
import { SessionService } from "@/services/SessionService";

export const SINFO_PRIMARY_COLOR = sinfoColors.primary;

function resolveDayColors(): string[] {
  const days = sinfoColors.days;

  let dayColors: string[] = [];
  if (days) {
    dayColors = [days.mon, days.tue, days.wed, days.thu, days.fri].filter(
      Boolean,
    );
  } else {
    dayColors = [
      sinfoColors.secondary,
      sinfoColors.tertiary,
      sinfoColors.quinary,
      sinfoColors.septenary,
      sinfoColors.senary,
    ].filter(Boolean);
  }

  if (dayColors.length === 0) {
    dayColors = [
      sinfoColors.days.mon,
      sinfoColors.days.tue,
      sinfoColors.days.wed,
      sinfoColors.days.thu,
      sinfoColors.days.fri,
    ];
  }

  return dayColors;
}

export function getDayColorForDate(
  date: Date,
  precomputedDayColors?: string[],
): string {
  const dayColors = precomputedDayColors ?? resolveDayColors();
  const dayIndex = date.getDay();
  let index = dayIndex - 1;

  if (index < 0) index = 0;
  if (index >= dayColors.length) index = index % dayColors.length;

  return dayColors[index];
}

export async function buildSpeakerColorMap(
  speakers: Speaker[],
): Promise<{ [id: string]: string }> {
  const map: { [id: string]: string } = {};

  const dayColors = resolveDayColors();

  // If speakers don't carry sessions
  const needSessions = speakers.some(
    (s) => !s?.sessions || s.sessions.length === 0,
  );
  let sessionsBySpeaker: { [id: string]: SINFOSession[] } = {};

  if (needSessions) {
    const allSessions = await SessionService.getSessions();
    if (allSessions && Array.isArray(allSessions)) {
      sessionsBySpeaker = allSessions.reduce(
        (acc: { [id: string]: SINFOSession[] }, sess: SINFOSession) => {
          // Case A: session has a top-level speaker id field (legacy)
          const singleSpeakerId =
            (sess as any).speaker ||
            (sess as any).speakerId ||
            (sess as any).speaker_id;
          if (singleSpeakerId) {
            acc[singleSpeakerId] = acc[singleSpeakerId] || [];
            acc[singleSpeakerId].push(sess);
            return acc;
          }

          // Case B: session has a `speakers` array with speaker objects [{ id, ... }, ...]
          if (Array.isArray(sess.speakers)) {
            sess.speakers.forEach((sp: Speaker | string) => {
              const spId =
                typeof sp === "string"
                  ? sp
                  : sp?.id ||
                    (sp as any)?.speaker ||
                    (sp as any)?.speakerId ||
                    (sp as any)?.speaker_id;
              if (!spId) return;
              acc[spId] = acc[spId] || [];
              acc[spId].push(sess);
            });
            return acc;
          }

          return acc;
        },
        {} as Record<string, any[]>,
      );
    }
  }

  speakers.forEach((s: Speaker, i: number) => {
    const sessions: SINFOSession[] =
      s.sessions && s.sessions.length > 0
        ? s.sessions
        : sessionsBySpeaker[s.id] || [];
    let color = dayColors[i % dayColors.length];

    if (sessions.length > 0) {
      const dateStr = sessions[0].date;
      if (dateStr) {
        color = getDayColorForDate(new Date(dateStr), dayColors);
      }
    }

    map[s.id] = color;
  });

  return map;
}

export async function buildEditionColorMap(
  speakers: Speaker[],
  edition?: number,
): Promise<{ [id: string]: string }> {
  const map: { [id: string]: string } = {};

  const editions = (sinfoColors.editions as any) || {};
  const editionKey = edition != null ? String(edition) : undefined;

  const editionColor = editionKey ? editions[editionKey] : undefined;
  const fallback = SINFO_PRIMARY_COLOR;
  const color = editionColor || fallback;

  speakers.forEach((s) => {
    map[s.id] = color;
  });

  return map;
}
