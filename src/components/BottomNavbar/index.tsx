import ImageWithFallback from "../ImageWithFallback";
import { sinfoLogo } from "@/assets/images";
import Link from "next/link";
import { TIC_LOCATION } from "@/constants";

export default function Footer() {
  return (
    <footer className="bg-sinfo-primary text-white">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Logo (left) */}
          <div className="hidden lg:flex flex-col items-start lg:col-span-3">
            <div className="w-48 lg:w-64">
              <Link href="/" className="flex items-center justify-center">
                <ImageWithFallback
                  src={sinfoLogo}
                  alt="SINFO logo"
                  width={320}
                  height={128}
                  className="object-contain w-full h-auto"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Link>
              <p className="mt-3 text-sm text-white/80 text-center w-full">
                Biggest Free Tech Conference in Portugal
              </p>
            </div>
          </div>

          {/* Columns group (right) */}
          <div className="lg:col-span-9 flex justify-end">
            <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-4 gap-8">
              <div className="text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-4">
                  The Event
                </h4>
                <ul className="space-y-3 text-sm text-white/80">
                  <li>
                    <Link href="/speakers" className="hover:underline">
                      Speakers
                    </Link>
                  </li>
                  <li>
                    <Link href="/sponsors" className="hover:underline">
                      Sponsors
                    </Link>
                  </li>
                  <li>
                    <Link href="/schedule" className="hover:underline">
                      Schedule
                    </Link>
                  </li>
                  <li>
                    <Link href="/team" className="hover:underline">
                      Our Team
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-4">
                  Follow Us
                </h4>
                <ul className="space-y-3 text-sm text-white/80">
                  <li>
                    <a
                      href="https://www.linkedin.com/company/sinfoist/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/sinfoist/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/@sinfoist"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      YouTube
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tiktok.com/@sinfoist"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      TikTok
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-4">
                  Legal
                </h4>
                <ul className="space-y-3 text-sm text-white/80">
                  <li>
                    <Link href="/privacy" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:underline">
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="hover:underline">
                      Cookies Policy
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-4">
                  Venue
                </h4>
                <a
                  href={TIC_LOCATION}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  <p className="text-sm text-white/80">
                    Técnico Innovation Center
                  </p>
                  <p className="text-sm text-white/80">
                    Av. Duque de Ávila 417, 1000-135 Lisboa, Portugal
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
