"use client";

import React from "react";

export default function SponsorHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center  mt-8">
      <div className="relative inline-block text-center">
        {/* Main label */}
        <div className="bg-sinfo-primary text-white px-12 py-5 rounded-[2rem] text-2xl font-bold shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
}
