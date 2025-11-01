import config from "../../tailwind.config";

export function generateTimeInterval(
  timestamp: string,
  durationMinutes: number,
  { onlyHours }: { onlyHours?: boolean } = {},
): string {
  // extract "HH:mm" from ISO string
  const formatTime = (date: Date) => date.toISOString().slice(11, 16);

  const startDate = new Date(timestamp);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

  return `${
    onlyHours
      ? formatTime(startDate)
      : startDate.toLocaleDateString("en-GB", {
          timeZone: "UTC",
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })
  } - ${formatTime(endDate)}`;
}

export function getEventDay(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
  });
}

export function getEventMonth(date: string, short: boolean = false): string {
  return new Date(date).toLocaleDateString("en-GB", {
    month: short ? "short" : "long",
  });
}

export function getEventWeekday(date: string, short: boolean = false): string {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: short ? "short" : "long",
  });
}

export function getEventFullDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getDayWithOrdinal(date: string): string {
  const d = new Date(date).getDate();
  if (d > 3 && d < 21) return `${d}th`;
  switch (d % 10) {
    case 1:
      return `${d}st`;
    case 2:
      return `${d}nd`;
    case 3:
      return `${d}rd`;
    default:
      return `${d}th`;
  }
}

export function getSessionColor(sessionKind: string) {
  switch (sessionKind) {
    case "Presentation":
      return config.theme.extend.colors.sinfo.tertiary;
    case "Workshop":
      return config.theme.extend.colors.sinfo.quaternary;
    case "Keynote":
      return config.theme.extend.colors.sinfo.secondary;
    default:
      return "#000";
  }
}

export function formatEventDateRange(
  begin: Date | string | undefined,
  end: Date | string | undefined,
  options: { format?: "short" | "long" } = {},
): string {
  const { format = "long" } = options;

  if (!begin || !end) {
    return format === "short" ? "20-24 APRIL 2026" : "April 20-24 2026";
  }

  const beginDate = new Date(begin);
  const endDate = new Date(end);

  const day1 = beginDate.getDate();
  const day2 = endDate.getDate();
  const month = beginDate.toLocaleDateString("en-US", { month: "long" });
  const monthShort = month.toUpperCase();
  const year = beginDate.getFullYear();

  if (format === "short") {
    return `${day1}-${day2} ${monthShort} ${year}`;
  }

  return `${month} ${day1}-${day2} ${year}`;
}
