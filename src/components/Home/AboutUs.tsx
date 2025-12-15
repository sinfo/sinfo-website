"use client";

import React from "react";
import ImageWithFallback from "../ImageWithFallback";
import Link from "next/link";
import { useEvent } from "@/context/EventContext";
import { getDayWithOrdinal, getEventEndDateString } from "@/utils/utils";

interface AboutUsProps {
  backgroundClass: string;
}

export default function AboutUs({ backgroundClass }: AboutUsProps) {
  const { event } = useEvent();

  const startDate = event ? getDayWithOrdinal(String(event.date)) : "";
  const endDate = event ? getEventEndDateString(event.date) : "";

  return (
    <section
      id="about-us"
      className={`relative w-full py-16 sm:py-20 md:py-24 ${backgroundClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 sm:mb-10 md:mb-12 text-center">
          About Us
        </h2>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 order-2 md:order-1">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              SINFO is a <b>student-led nonprofit</b> that organizes one of
              Portugal&apos;s <b>largest free tech conferences</b>. Our mission
              is to connect students, professionals, and industry leaders around
              computer science and technology.
            </p>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              Each year, we host a <b>week-long event</b> at the{" "}
              <b>Técnico Innovation Center</b> in Lisbon. Attendees can enjoy
              international keynotes, hands-on workshops, company presentations,
              a job fair, and panel discussions on the latest tech trends—all{" "}
              <b>completely free</b>.
            </p>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              Last year, we achieved <b>record-breaking attendance</b>, and we
              are excited to build on that success during <b>{event?.name}</b>,
              happening from the{" "}
              <b>
                {startDate} to the {endDate}
              </b>
              .
            </p>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              Join us and be part of Portugal&apos;s{" "}
              <b>vibrant tech community</b>!
            </p>

            <div className="pt-2 sm:pt-3 md:pt-4">
              <Link href="/team">
                <button className="bg-sinfo-primary text-white px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm hover:bg-sinfo-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto">
                  Meet the Team
                </button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2">
            <ImageWithFallback
              src="/images/event/about-us.jpg"
              alt="SINFO Event"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
