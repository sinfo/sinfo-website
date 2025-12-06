import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";
import { workHacky } from "@/assets/images";
import CallToAction from "@/components/CallToAction";

export default function SchedulesComingSoon() {
  return (
    <div className="relative overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-sinfo-primary/10 blur-3xl animate-blob" />
        <div className="absolute top-1/4 -right-10 h-64 w-64 rounded-full bg-sinfo-tertiary/10 blur-3xl animate-blob [animation-delay:800ms]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-sinfo-quinary/10 blur-3xl animate-blob [animation-delay:1500ms]" />
      </div>

      <section className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <h1 className="relative text-7xl font-extrabold leading-none tracking-tight sm:text-8xl">
          <span className="text-sinfo-primary">Coming soon</span>
        </h1>

        <p className="max-w-xl text-balance text-base text-gray-600 sm:text-lg">
          It looks like Hacky is working on something awesome!
        </p>

        {/* Static Hacky placed just above the CTA so it looks like he's holding the button */}
        <div className="relative mx-auto mt-2 -mb-11 flex items-end justify-center">
          <Link href="/" className="select-none">
            <ImageWithFallback
              src={workHacky}
              alt="Work Hacky"
              priority
              className="origin-bottom w-48 sm:w-56"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        </div>

        <div className="mt-1 flex items-center justify-center gap-3">
          <CallToAction href="/" variant="primary">
            Go back home
          </CallToAction>
        </div>
      </section>
    </div>
  );
}
