"use client";

import React from "react";
import CallToAction from "@/components/CallToAction";
import StatCard from "@/components/StatCard";
import { ArrowRight, MessageCircleQuestionIcon } from "lucide-react";
import { TIC_LOCATION } from "@/constants";
import { useEvent } from "@/context/EventContext";
import { formatEventDateRange } from "@/utils/utils";

export default function HeroSection() {
  const { event } = useEvent();

  const stats = [
    { label: "ATTENDEES", value: "5,000+" },
    { label: "SPEAKERS", value: "30+" },
    { label: "COMPANIES", value: "100+" },
    { label: "YEARS OF COMMUNITY", value: "32" },
  ];

  const handleScrollToFAQ = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const faqSection = document.querySelector("#faq");
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/after-movie.mp4" type="video/mp4" />
        <source src="/videos/after-movie.webm" type="video/webm" />
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-sinfo-primary/70 via-sinfo-primary/60 to-sinfo-primary/75 z-10" />

      {/* Content */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-28 md:py-32 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto">
          {/* Date Badge */}
          <div className="mb-6 sm:mb-8 md:mb-10 flex justify-start">
            <CallToAction href={TIC_LOCATION} variant="secondary">
              {formatEventDateRange(event?.begin, event?.end, {
                format: "short",
              })}{" "}
              • LISBON
            </CallToAction>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight max-w-4xl">
            The Biggest Free Tech Conference in Portugal
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-8 sm:mb-10 md:mb-12 max-w-2xl leading-relaxed">
            SINFO is Portugal&apos;s largest free technology event connecting
            students, startups, and global innovators. Discover emerging trends,
            master new skills, and unlock opportunities with the brightest minds
            in the industry.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-4 mb-12 sm:mb-14 md:mb-16">
            <CallToAction href="/schedule" variant="primary">
              <div className="flex items-center">
                <span>Explore the Program</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </CallToAction>
            <a
              href="/#faq"
              onClick={handleScrollToFAQ}
              className="flex items-center text-white/90 hover:text-white transition-colors font-medium text-sm sm:text-base"
            >
              FAQ
              <MessageCircleQuestionIcon className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
