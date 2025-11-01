"use client";

import ImageWithFallback from "../ImageWithFallback";
import { sinfoLogo } from "@/assets/images";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TIC_LOCATION } from "@/constants";

export default function Toolbar() {
  const router = useRouter();
  const currPath = usePathname();

  const [isExpanded, setIsExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHomePage = currPath === "/";

  // Navigation links
  const navLinks = [
    { href: "/speakers", label: "SPEAKERS" },
    { href: "/sponsors", label: "SPONSORS" },
    { href: "/schedule", label: "SCHEDULE" },
    { href: "/team", label: "TEAM" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHomePage && !scrolled
            ? "bg-transparent"
            : scrolled
              ? "bg-sinfo-primary shadow-lg"
              : "bg-sinfo-primary backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Left section - Logo */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <Link href="/" className="flex items-center">
                <ImageWithFallback
                  className="h-7 sm:h-8 w-auto lg:h-10"
                  src={sinfoLogo}
                  alt="SINFO logo"
                  quality={100}
                />
              </Link>
              <div className="hidden md:block h-6 w-px bg-white/30" />
              <div className="hidden md:block text-white/90 text-xs lg:text-sm font-medium tracking-wide">
                <a href={TIC_LOCATION}>Técnico Innovation Center</a><br></br>
                April 20-24 2026
              </div>
            </div>

            {/* Center section - Navigation links (Desktop only) */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm xl:text-base font-semibold tracking-wide transition-colors duration-200 ${
                    currPath === link.href
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right section - CTA Button and Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="https://app.sinfo.org/"
                className="hidden sm:block"
                target="_blank"
              >
                <button
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 ${
                    scrolled
                      ? "bg-sinfo-light text-sinfo-primary hover:bg-white"
                      : "bg-white text-sinfo-primary hover:bg-sinfo-light"
                  }`}
                >
                  Go to App
                </button>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isExpanded ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation Menu */}
          {isExpanded && (
            <div className="lg:hidden border-t border-white/10">
              <div className="py-3 sm:py-4 space-y-1 sm:space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsExpanded(false)}
                    className={`block px-4 py-2.5 sm:py-3 text-sm font-semibold rounded-lg transition-colors ${
                      currPath === link.href
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="https://app.sinfo.org/"
                  onClick={() => setIsExpanded(false)}
                  className="block sm:hidden"
                  target="_blank"
                >
                  <button className="w-full mt-2 px-4 py-2.5 sm:py-3 bg-white text-sinfo-primary rounded-lg font-semibold text-sm hover:bg-sinfo-light transition-colors">
                    Go to App
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed navbar */}
      {!isHomePage && <div className="h-14 sm:h-16 lg:h-20" />}
    </>
  );
}
