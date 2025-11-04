"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SpeakersHighlightProps {
  backgroundClass: string;
}

import { SpeakerService } from "@/services/SpeakerService";
import ImageWithFallback from "../ImageWithFallback";

export default function SpeakersHighlight({ backgroundClass }: SpeakersHighlightProps) {
  const [hoveredSpeaker, setHoveredSpeaker] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
	useEffect(() => {
		(async () => {
			// Fetch speakers then shuffle them before setting state so order is random on each mount
			try {
				const data = await SpeakerService.getPreviousEditionSpeakersHighlight();
				// Fisher-Yates shuffle (in-place on a copy)
				const shuffled = data.slice();
				for (let i = shuffled.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					const tmp = shuffled[i];
					shuffled[i] = shuffled[j];
					shuffled[j] = tmp;
				}
				setSpeakers(shuffled);
			} finally {
				setIsLoading(false);
			}
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

	// Drag-to-scroll state (pointer events)
	const isDraggingRef = useRef(false);
	const startXRef = useRef(0);
	const scrollLeftRef = useRef(0);
	const [isDragging, setIsDragging] = useState(false);

	// velocity / momentum
	const lastXRef = useRef(0);
	const lastTimeRef = useRef(0);
	const prevXRef = useRef(0);
	const prevTimeRef = useRef(0);
	const velocityRef = useRef(0); // px per ms
	const momentumRafRef = useRef<number | null>(null);

	const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		// Ignore touch pointers so mobile uses native scrolling/animations
		if (e.pointerType === 'touch') return;
		const el = scrollContainerRef.current;
		if (!el) return;
		isDraggingRef.current = true;
		setIsDragging(true);
		// capture pointer so we continue receiving events outside the element
		try {
			el.setPointerCapture(e.pointerId);
		} catch {}
		startXRef.current = e.clientX;
		scrollLeftRef.current = el.scrollLeft;
	};

	const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!isDraggingRef.current || !scrollContainerRef.current) return;
		const el = scrollContainerRef.current;
		const dx = e.clientX - startXRef.current;
		// invert dx so dragging left moves the content left
		el.scrollLeft = scrollLeftRef.current - dx;

		// velocity tracking (keep last two points)
		const now = performance.now();
		prevXRef.current = lastXRef.current;
		prevTimeRef.current = lastTimeRef.current;
		lastXRef.current = e.clientX;
		lastTimeRef.current = now;
		if (prevTimeRef.current && now !== prevTimeRef.current) {
			velocityRef.current = (lastXRef.current - prevXRef.current) / (now - prevTimeRef.current);
		}
	};

	const endDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
		if (!isDraggingRef.current) return;
		isDraggingRef.current = false;
		setIsDragging(false);
		const el = scrollContainerRef.current;
		if (!el) return;
		try {
			if (e) el.releasePointerCapture(e.pointerId);
		} catch {}

		// start momentum if velocity exists
		const startMomentum = () => {
			if (!scrollContainerRef.current) return;
			let v = velocityRef.current; // px per ms
			const step = () => {
				if (!scrollContainerRef.current) return;
				// convert to px per frame (approx 16ms)
				const delta = v * 16;
				scrollContainerRef.current.scrollLeft -= delta;
				// apply friction
				v *= 0.95;
				// stop when very slow
				if (Math.abs(v) > 0.02) {
					momentumRafRef.current = requestAnimationFrame(step);
				} else {
					momentumRafRef.current = null;
				}
			};
			// kick off
			if (Math.abs(v) > 0.02) {
				momentumRafRef.current = requestAnimationFrame(step);
			}
		};

		// cancel any previous momentum and start new one
		if (momentumRafRef.current) {
			cancelAnimationFrame(momentumRafRef.current);
			momentumRafRef.current = null;
		}
		startMomentum();
	};

	// cancel momentum if user interacts again
	useEffect(() => {
		return () => {
			if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);
		};
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
					onPointerDown={onPointerDown}
					onPointerMove={onPointerMove}
					onPointerUp={endDrag}
					onPointerCancel={endDrag}
					onPointerLeave={endDrag}
					className={`flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 ${isDragging ? 'dragging no-snap cursor-grabbing select-none' : 'cursor-grab'}`}
					style={{ paddingLeft: '50vw', paddingRight: '50vw' }}
				>
								{speakers.map((speaker, index) => {
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
											<ImageWithFallback
												src={
												  speaker.imageName || speaker.img
												}
												alt={speaker.name}
												fill
												className="object-cover"
											/>
										</div>

										{/* YouTube Video - Right Side */}
																				<div className="hidden md:block md:w-2/3 w-full relative overflow-hidden">
																						<div className="iframe-container">
												<iframe
													src={`https://www.youtube.com/embed/${speaker.videoId ?? ''}?autoplay=${hoveredSpeaker === speaker.id ? '1' : '0'}&mute=1&controls=1`}
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

				/* Visual feedback while dragging (desktop) */
				.dragging [data-card] {
					transform: translateY(-6px) scale(1.01);
					transition: transform 150ms ease;
				}

				/* disable scroll snap while dragging for smoother feel */
				.no-snap {
					scroll-snap-type: none !important;
				}
			`}</style>
		</section>
	);
}
