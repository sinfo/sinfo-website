"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type DayItem = {
  day: string;
  id: string;
};

export default function ScheduleDaysNav({ dayItems }: { dayItems: DayItem[] }) {
  const [activeId, setActiveId] = useState(dayItems[0]?.id ?? "");

  useEffect(() => {
    if (dayItems.length === 0) return;

    const scrollOffset = 180;

    const updateActiveDay = () => {
      let currentId = dayItems[0].id;

      for (const item of dayItems) {
        const section = document.getElementById(item.id);
        if (!section) continue;

        if (section.getBoundingClientRect().top - scrollOffset <= 0) {
          currentId = item.id;
        }
      }

      setActiveId(currentId);
    };

    updateActiveDay();
    window.addEventListener("scroll", updateActiveDay, { passive: true });
    window.addEventListener("resize", updateActiveDay);

    return () => {
      window.removeEventListener("scroll", updateActiveDay);
      window.removeEventListener("resize", updateActiveDay);
    };
  }, [dayItems]);

  return (
    <div className="sticky top-20">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Days
        </p>
        <nav className="space-y-2">
          {dayItems.map((item) => {
            const isActive = item.id === activeId;
            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sinfo-primary/10 text-sinfo-primary"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                aria-current={isActive ? "location" : undefined}
              >
                {item.day}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
