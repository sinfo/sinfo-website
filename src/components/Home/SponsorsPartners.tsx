"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import LogoCarousel, { type Logo } from "./LogoCarousel";

interface SponsorsPartnersProps {
  backgroundClass: string;
}

export default function SponsorsPartners({
  backgroundClass,
}: SponsorsPartnersProps) {
  const partnerLogos = [
    {
      name: "American Corner",
      img: "/images/companies/partners/american-corner.png",
    },
    { name: "CNN Portugal", img: "/images/companies/partners/cnn.png" },
    { name: "Corsair", img: "/images/companies/partners/corsair.png" },
    { name: "Ducky", img: "/images/companies/partners/ducky.png" },
    { name: "Elgato", img: "/images/companies/partners/elgato.svg" },
    { name: "Noblechairs", img: "/images/companies/partners/noblechairs.png" },
    { name: "Oracle", img: "/images/companies/partners/oracle.svg" },
    {
      name: "The Next Big Idea",
      img: "/images/companies/partners/the-next-big-idea.png",
    },
  ];

  const sponsorLogos = [
    { name: "Axians", img: "/images/companies/plats/axians.svg" },
    { name: "Cloudflare", img: "/images/companies/plats/cloudflare.svg" },
    { name: "Dremio", img: "/images/companies/plats/dremio.png" },
    { name: "Freiheit", img: "/images/companies/plats/freiheit.svg" },
    { name: "Premium Minds", img: "/images/companies/plats/premium-minds.svg" },
    { name: "SingleStore", img: "/images/companies/plats/single-store.svg" },
    { name: "Sky", img: "/images/companies/plats/sky.svg" },
    { name: "Start Campus", img: "/images/companies/plats/start-campus.svg" },
  ];

  const [currentSponsorIndex, setCurrentSponsorIndex] = useState(0);
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);

  // Auto-rotate sponsors every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSponsorIndex((prev) => (prev + 1) % sponsorLogos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sponsorLogos.length]);

  // Auto-rotate partners every 3 seconds (offset by 1.5s)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPartnerIndex((prev) => (prev + 1) % partnerLogos.length);
    }, 3000);
    // offset initial step so they don't rotate in lockstep
    const timeout = setTimeout(
      () => setCurrentPartnerIndex((p) => (p + 1) % partnerLogos.length),
      1500,
    );
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [partnerLogos.length]);

  return (
    <section
      id="sponsors"
      className={`relative w-full py-16 sm:py-20 md:py-24 ${backgroundClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 text-center">
          Sponsors & Partners
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16 px-4">
          Join leading tech companies in supporting Portugal&apos;s biggest free
          tech conference. Connect with thousands of talented students and
          professionals.
        </p>

        {/* Become a Sponsor Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-12 mb-8 sm:mb-10 md:mb-12 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="px-2">
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Become a Sponsor
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-5 sm:mb-6 leading-relaxed">
                SINFO isn&apos;t just a tech event, it&apos;s a prime networking
                hub! Whether you&apos;re seeking career opportunities, industry
                insights, or simply want to make valuable connections, this is
                the place to be.
              </p>
              <div className="inline-block bg-white/95 backdrop-blur-sm rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 shadow-lg">
                <Link
                  href="mailto:sponsor@sinfo.org"
                  className="inline-block text-sinfo-primary text-sm sm:text-base font-semibold hover:underline break-all"
                >
                  sponsor@sinfo.org
                </Link>
              </div>
            </div>

            {/* Sponsor Logo Carousel */}
            <div className="py-4 sm:py-6 md:py-8 -mx-4 sm:-mx-2 md:mx-0">
              <LogoCarousel
                logos={sponsorLogos}
                currentIndex={currentSponsorIndex}
                setIndex={setCurrentSponsorIndex}
                ariaLabel="sponsors logo carousel"
              />
            </div>
          </div>
        </div>

        {/* Become a Partner Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            {/* Partner Logo Carousel */}
            <div className="py-4 sm:py-6 md:py-8 order-2 md:order-1 -mx-2 sm:mx-0">
              <LogoCarousel
                logos={partnerLogos}
                currentIndex={currentPartnerIndex}
                setIndex={setCurrentPartnerIndex}
                ariaLabel="partners logo carousel"
              />
            </div>

            {/* Text Content */}
            <div className="order-1 md:order-2 px-2">
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Become a Partner
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-5 sm:mb-6 leading-relaxed">
                Gain visibility among 5,000+ attendees, showcase your brand, and
                connect with top talent. Let&apos;s discuss how we can create a
                partnership that works for you.
              </p>
              <div className="inline-block bg-white/95 backdrop-blur-sm rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 shadow-lg">
                <Link
                  href="mailto:partner@sinfo.org"
                  className="inline-block text-sinfo-primary text-sm sm:text-base font-semibold hover:underline break-all"
                >
                  partner@sinfo.org
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
