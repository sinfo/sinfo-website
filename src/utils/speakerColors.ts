import config from "../../tailwind.config";
import { SessionService } from "@/services/SessionService";

export async function buildSpeakerColorMap(
  speakers: Speaker[],
): Promise<{ [id: string]: string }> {
  const map: { [id: string]: string } = {};

  const sinfoColors = (config.theme?.extend?.colors?.sinfo as any) || {};
  const days = (sinfoColors?.days as any) || null;

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
    dayColors = ["#bf2c21", "#f1853a", "#fcbd14", "#48c6e4", "#c465a2"];
  }

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
        const date = new Date(dateStr);
        const dayIndex = date.getDay(); // 0-6 (Sun-Sat)
        let index = dayIndex - 1; // Map Mon(1)->0
        if (index < 0) index = 0;
        if (index >= dayColors.length) index = index % dayColors.length;
        color = dayColors[index];
      }
    }

    map[s.id] = color;
  });

  return map;
}
