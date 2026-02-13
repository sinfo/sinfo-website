import React from "react";

interface SpeakerBlobProps {
  color: string;
  className?: string; // To allow overriding classes (like scaling on hover)
}

export default function SpeakerBlob({
  color,
  className = "",
}: SpeakerBlobProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill={color}
        d="M42.5,-62.1C54.1,-50,62,-36.3,65.3,-22.2C68.6,-8,67.3,6.7,64.1,22.2C61,37.6,55.9,53.8,44.9,61.1C33.9,68.5,16.9,66.9,-1.1,68.4C-19.1,69.9,-38.2,74.3,-53.8,68.5C-69.4,62.7,-81.6,46.6,-82.1,30.2C-82.5,13.8,-71.2,-2.8,-60.5,-14.7C-49.8,-26.5,-39.6,-33.5,-29.6,-46.1C-19.6,-58.8,-9.8,-77,2.8,-80.9C15.4,-84.8,30.8,-74.2,42.5,-62.1Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
