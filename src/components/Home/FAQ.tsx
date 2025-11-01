"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { TIC_LOCATION } from "@/constants";
import { useEvent } from "@/context/EventContext";
import { getDayWithOrdinal, getEventMonth } from "@/utils/utils";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQProps {
  backgroundClass: string;
}

export default function FAQ({ backgroundClass }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const { event } = useEvent();

  const faqItems = useMemo<FAQItem[]>(() => {
    const startDate = event ? getDayWithOrdinal(String(event.begin)) : "";
    const endDate = event
      ? `${getDayWithOrdinal(String(event.end))} of ${getEventMonth(
          String(event.end),
        )} ${new Date(event.end).getFullYear()}`
      : "";
    return [
      {
        question: "Is SINFO really free?",
        answer:
          "Yes! SINFO is — and always will be — completely free to attend. We believe in making technology and knowledge accessible to everyone.",
      },
      {
        question: `Where is ${event?.name} taking place?`,
        answer: (
          <>
            Visit us at{" "}
            <Link
              href={TIC_LOCATION}
              target="_blank"
              className="text-sinfo-primary font-semibold hover:underline"
            >
              Técnico Innovation Center
            </Link>
            , in Lisbon, from the {startDate} to the {endDate}!
          </>
        ),
      },
      {
        question: "I'm not a student can I attend the event?",
        answer:
          "Absolutely! While SINFO is organized by students, we welcome everyone interested in technology, regardless of their background or current occupation.",
      },
      {
        question: "We want to be sponsors, how can we proceed?",
        answer: (
          <>
            We&apos;d love to have you as a sponsor! Please reach out to us at{" "}
            <Link
              href="mailto:geral@sinfo.org"
              className="text-sinfo-primary font-semibold hover:underline"
            >
              geral@sinfo.org
            </Link>{" "}
            for additional information and assistance!
          </>
        ),
      },
      {
        question: "How can I join the SINFO team?",
        answer: (
          <>
            We&apos;d love to have you on our team! If you&apos;re a student and
            want to help organize one of the country&apos;s biggest tech
            conferences, send us an e-mail to{" "}
            <Link
              href="mailto:rh@sinfo.org"
              className="text-sinfo-primary font-semibold hover:underline"
            >
              rh@sinfo.org
            </Link>{" "}
            with your name, contact, degree & year, university, and motivation!
          </>
        ),
      },
      {
        question: "I need help. How can I contact the SINFO team?",
        answer: (
          <>
            You can reach out to us by sending an e-mail to{" "}
            <Link
              href="mailto:geral@sinfo.org"
              className="text-sinfo-primary font-semibold hover:underline"
            >
              geral@sinfo.org
            </Link>{" "}
            or contact us through any of our social networks!
          </>
        ),
      },
    ];
  }, [event]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // refs to measure content heights for smooth transitions
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [heights, setHeights] = useState<Record<number, number>>({});

  // measure heights after mount and whenever window resizes
  useEffect(() => {
    const measure = () => {
      const next: Record<number, number> = {};
      faqItems.forEach((_, i) => {
        const el = contentRefs.current[i];
        if (el) next[i] = el.scrollHeight;
      });
      setHeights(next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    // observe each content node if present
    contentRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [faqItems]);

  return (
    <section
      id="faq"
      className={`relative w-full py-16 sm:py-20 md:py-24 ${backgroundClass}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center mb-6 sm:mb-7 md:mb-8">
          If you can&apos;t find an answer that you&apos;re looking for, feel
          free to drop us a line.
        </p>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-base sm:text-lg font-semibold text-gray-900 pr-3 sm:pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className="overflow-hidden"
                style={{
                  height:
                    openIndex === index ? (heights[index] ?? undefined) : 0,
                  transition: "height 300ms cubic-bezier(.2,.8,.2,1)",
                }}
                aria-hidden={openIndex !== index}
              >
                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className={`px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-gray-700 leading-relaxed transform transition-all duration-300 ${
                    openIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }`}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
