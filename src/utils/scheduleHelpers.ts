export function groupSessionsByDay(sessions: SINFOSession[]) {
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

const KIND_GROUP: Record<string, number> = {
  presentation: 0,
  keynote: 1,
  "connect stage": 1,
  workshop: 2,
};

function getKindGroup(kind: string): number {
  const key = kind?.toLowerCase() ?? "";
  for (const [pattern, group] of Object.entries(KIND_GROUP)) {
    if (key.includes(pattern)) return group;
  }
  return 3; // everything else goes last
}

export function groupByKind(
  sessions: { session: SINFOSession; qna?: SINFOSession }[],
) {
  const groups: { session: SINFOSession; qna?: SINFOSession }[][] = [
    [],
    [],
    [],
  ];
  const overflow: { session: SINFOSession; qna?: SINFOSession }[] = [];

  // Find the keynote time window for this day
  const keynotes = sessions.filter(
    (item) => getKindGroup(item.session.kind) === 1,
  );
  const keynoteStart = keynotes.length
    ? Math.min(...keynotes.map((k) => new Date(k.session.date).getTime()))
    : Infinity;
  const keynoteEnd = keynotes.length
    ? Math.max(
        ...keynotes.map(
          (k) =>
            new Date(k.session.date).getTime() + k.session.duration * 60000,
        ),
      )
    : -Infinity;

  for (const item of sessions) {
    let g = getKindGroup(item.session.kind);

    // Promote workshops that overlap with the keynote window OR are on Connect Stage
    if (g === 2) {
      const start = new Date(item.session.date).getTime();
      const end = start + item.session.duration * 60000;
      const isConnectStage = item.session.place
        ?.toLowerCase()
        .includes("connect stage");
      if (isConnectStage || (start < keynoteEnd && end > keynoteStart)) g = 1;
    }

    if (g < 3) groups[g].push(item);
    else overflow.push(item);
  }

  return [...groups, overflow].filter((g) => g.length > 0);
}

export function attachQnaSessions(sessions: SINFOSession[]): {
  session: SINFOSession;
  qna?: SINFOSession;
}[] {
  const isKeynoteKind = (kind: string) => {
    const k = kind?.toLowerCase() ?? "";
    return k.includes("keynote") || k.includes("connect stage");
  };

  const isQnaKind = (kind: string) => kind?.toLowerCase().includes("q&a");

  const qnaIds = new Set(
    sessions.filter((s) => isQnaKind(s.kind)).map((s) => s.id),
  );

  const result: { session: SINFOSession; qna?: SINFOSession }[] = [];

  for (const session of sessions) {
    if (qnaIds.has(session.id)) continue;

    if (isKeynoteKind(session.kind)) {
      const keynoteEnd =
        new Date(session.date).getTime() + session.duration * 60000;
      // match Q&A that starts within 5 minutes of keynote end (no place constraint)
      const qna = sessions.find(
        (s) =>
          isQnaKind(s.kind) &&
          Math.abs(new Date(s.date).getTime() - keynoteEnd) <= 5 * 60000,
      );
      result.push({ session, qna });
    } else {
      result.push({ session });
    }
  }

  return result;
}

export function getDayId(day: string) {
  return `day-${day
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;
}
