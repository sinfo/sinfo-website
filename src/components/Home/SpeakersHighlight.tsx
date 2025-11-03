"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SpeakersHighlightProps {
  backgroundClass: string;
}

import Speaker1 from "@/assets/images/speakers/speaker1.jpg";
import Speaker2 from "@/assets/images/speakers/speaker2.jpg";
import Speaker3 from "@/assets/images/speakers/speaker3.jpg";
import Speaker4 from "@/assets/images/speakers/speaker4.jpg";
import Speaker5 from "@/assets/images/speakers/speaker5.jpg";
import { SpeakerService } from "@/services/SpeakerService";
const speakerImages = [Speaker1, Speaker2, Speaker3, Speaker4, Speaker5];

export default function SpeakersHighlight({ backgroundClass }: SpeakersHighlightProps) {
  const [hoveredSpeaker, setHoveredSpeaker] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  useEffect(() => {
    (async () => {
      setSpeakers(await SpeakerService.getPreviousEditionSpeakersHighlight().finally(() => setIsLoading(false)));
    })();
  }, []);

  // Center the first card on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const firstCard = container.querySelector('[data-card]') as HTMLElement;
        
        if (firstCard) {
          const containerWidth = container.clientWidth;
          const cardWidth = firstCard.clientWidth;
          
          // Calculate the scroll needed to center the first card
          const centerOffset = (containerWidth - cardWidth) / 2;
          
          container.scrollTo({
            left: -centerOffset,
            behavior: "instant" as ScrollBehavior,
          });
        }
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
			id="event"
			className={`relative z-20 w-full py-16 ${backgroundClass}`}
		>
			<div className="max-w-6xl mx-auto px-6 text-center">
				{/* Section Heading */}
				<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
					Previous Speakers
				</h2>

				<p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto mb-8">
					From global tech leaders to industry innovators, they came to inspire the next generation. Meet the minds that powered the last edition of SINFO.
				</p>
			</div>

			{/* Horizontal Scrollable Cards */}
			<div className="relative overflow-hidden">
				<div 
					ref={scrollContainerRef}
					className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
					style={{ paddingLeft: '50vw', paddingRight: '50vw' }}
				>
					{speakers.map((speaker, index) => {
						// Random YouTube video IDs for demo
						const videoIds = [
							"6EoG-sPScl4",
							"n1uqD2h2vy0",
							"Jpgw8ssJXFQ",
							"03m8UZt0Bjs",
							"tgbNymZ7vqY",
							"L_jWHffIx5E",
						];

						return (
							<div
								key={speaker.id}
								data-card
								className="flex-shrink-0 w-[85vw] md:w-[800px] snap-center"
								onMouseEnter={() => setHoveredSpeaker(speaker.id)}
								onMouseLeave={() => setHoveredSpeaker(null)}
							>
								<div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] transform-gpu h-full flex flex-col">
									{/* Top Section: Image and Video */}
									{/* Use an aspect-ratio-driven video container so the height is determined by the 16:9 video; the image will stretch to match that height. On small screens it stacks vertically. */}
									<div className="flex flex-col md:flex-row items-stretch bg-black">
										{/* Speaker Image - Left Side */}
										<div className="w-full md:w-1/3 relative overflow-hidden aspect-[16/9] md:aspect-auto">
											<Image
												src={speakerImages[index % speakerImages.length]}
												alt={speaker.name}
												fill
												className="object-cover"
											/>
										</div>

										{/* YouTube Video - Right Side */}
                                        <div className="hidden md:block md:w-2/3 w-full relative overflow-hidden">
											<div className="iframe-container">
						<iframe
						  src={`https://www.youtube.com/embed/${videoIds[index % videoIds.length]}?autoplay=${hoveredSpeaker === speaker.id ? '1' : '0'}&mute=1&controls=1`}
						  title={`${speaker.name} Talk`}
						  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						  allowFullScreen
						/>
					  </div>
										</div>
									</div>

									{/* Bottom Section: Speaker Info */}
									<div className="p-6 bg-white">
										<h3 className="text-xl font-bold text-gray-900 mb-2">
											{speaker.name}
										</h3>
										<p className="text-sm text-gray-600 mb-3 font-medium">
											{speaker.title}
										</p>
										<p className="text-sm text-gray-700 line-clamp-3">
											{speaker.description}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Custom CSS to hide scrollbar */}
			<style jsx>{`
				.scrollbar-hide::-webkit-scrollbar {
					display: none;
				}
				.scrollbar-hide {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}

				.iframe-container {
					position: relative;
					width: 100%;
					/* drive the container height by the 16:9 aspect ratio */
					aspect-ratio: 16 / 9;
					overflow: hidden;
				}

				.iframe-container iframe {
					position: absolute;
					inset: 0;
					width: 100%;
					height: 100%;
					border: 0;
					display: block;
				}
			`}</style>
		</section>
	);
}
