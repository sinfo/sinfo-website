"use client";

import React, { useEffect, useRef, useState } from "react";

interface StatCardProps {
  label: string;
  value: string;
}

export default function StatCard({ label, value }: StatCardProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Extract number and suffix from value (e.g., "5,000+" -> 5000 and "+")
  const parseValue = (val: string) => {
    const numberMatch = val.match(/[\d,]+/);
    const number = numberMatch
      ? parseInt(numberMatch[0].replace(/,/g, ""), 10)
      : 0;
    const suffix = val.replace(/[\d,]/g, "").trim();
    return { number, suffix };
  };

  const { number: targetNumber, suffix } = parseValue(value);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    const current = cardRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 35;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const randomValue = Math.floor(Math.random() * targetNumber); // Generate a random number up to the target
      current = Math.min(randomValue, targetNumber);
      setCount(current);

      if (current >= targetNumber || step >= steps) {
        clearInterval(timer);
        setCount(targetNumber);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, targetNumber]);

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US");
  };

  return (
    <div
      ref={cardRef}
      className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      <p className="text-sinfo-primary/60 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1 sm:mb-2">
        {label}
      </p>
      <p
        className="text-sinfo-primary text-2xl sm:text-3xl md:text-4xl font-bold transition-all duration-500 ease-in-out"
        style={{ transform: `scale(${1 + (count / targetNumber) * 0.05})` }}
      >
        {formatNumber(count)}
        {suffix}
      </p>
    </div>
  );
}
