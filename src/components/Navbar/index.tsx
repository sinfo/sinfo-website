"use client";

import ImageWithFallback from "../ImageWithFallback";
import { sinfoLogo } from "@/assets/images";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { TIC_LOCATION } from "@/constants";
import { useEvent } from "@/context/EventContext";
import { addDays, formatEventDateRange } from "@/utils/utils";

export default function Toolbar() {
  const router = useRouter();
  const currPath = usePathname();
  const { event } = useEvent();

  const [isExpanded, setIsExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHomePage = currPath === "/";

  // Navigation link types
  type NavLink =
    | { href: string; label: string }
    | { label: string; children: { href: string; label: string }[] };

  // Navigation links
  const navLinks: NavLink[] = [
    { href: "/speakers", label: "SPEAKERS" },
    // {
    //   label: "SPEAKERS",
    //   children: [
    //     { href: "/speakers", label: "Current Edition" },
    //     { href: "/speakers/previous", label: "Previous Edition" },
    //   ],
    // },
    { href: "/sponsors", label: "SPONSORS" },
    { href: "/partners", label: "PARTNERS" },
    { href: "/schedule", label: "SCHEDULE" },
    { href: "/team", label: "TEAM" },
  ];

  const [openDropdown, setOpenDropdown] = useState<null | string>(null);
  // Holds a closing timeout id so we can delay closing on small pointer gaps
  const closeTimeout = useRef<number | null>(null);

  // Clear any pending timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeout.current) {
        window.clearTimeout(closeTimeout.current);
        closeTimeout.current = null;
      }
    };
  }, []);

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
          isHomePage && !scrolled && !isExpanded
            ? "bg-transparent"
            : scrolled || isExpanded
              ? "bg-sinfo-primary shadow-lg"
              : "bg-sinfo-primary backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 laptop:px-8">
          <nav className="flex items-center justify-between h-14 sm:h-16 laptop:h-20">
            {/* Left section - Logo */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <Link href="/" className="flex items-center">
                <ImageWithFallback
                  className="h-7 sm:h-8 w-auto laptop:h-10"
                  src={sinfoLogo}
                  alt="SINFO logo"
                  quality={100}
                  width={160}
                  height={40}
                />
              </Link>
              <div className="hidden md:block h-6 w-px bg-white/30" />
              <div className="hidden md:block text-white/90 text-xs laptop:text-sm font-medium tracking-wide">
                <a href={TIC_LOCATION} target="_blank">
                  Técnico Innovation Center
                </a>
                <br></br>
                {formatEventDateRange(
                  event?.date,
                  event?.date ? addDays(event.date, 4) : undefined,
                )}
              </div>
            </div>

            {/* Center section - Navigation links (Desktop only) */}
            <div className="hidden laptop:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => {
                // If link has children, render a dropdown
                if ((link as any).children) {
                  const item = link as {
                    label: string;
                    children: { href: string; label: string }[];
                  };
                  const isActive = item.children.some(
                    (c) => currPath === c.href || currPath?.startsWith(c.href),
                  );
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => {
                        // cancel any pending close and open immediately
                        if (closeTimeout.current) {
                          window.clearTimeout(closeTimeout.current);
                          closeTimeout.current = null;
                        }
                        setOpenDropdown(item.label);
                      }}
                      onMouseLeave={() => {
                        // delay closing to allow moving into the dropdown panel
                        if (closeTimeout.current)
                          window.clearTimeout(closeTimeout.current);
                        closeTimeout.current = window.setTimeout(() => {
                          setOpenDropdown(null);
                          closeTimeout.current = null;
                        }, 180);
                      }}
                    >
                      <button
                        onClick={() =>
                          setOpenDropdown((s) =>
                            s === item.label ? null : item.label,
                          )
                        }
                        className={`text-sm xl:text-base font-semibold tracking-wide transition-colors duration-200 flex items-center gap-2 ${
                          isActive
                            ? "text-white"
                            : "text-white/80 hover:text-white"
                        }`}
                        aria-haspopup="menu"
                        aria-expanded={openDropdown === item.label}
                      >
                        {item.label}
                        <svg
                          className="h-3 w-3 text-white/80"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {openDropdown === item.label && (
                        <div
                          className="absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black/5"
                          role="menu"
                          aria-label={`${item.label} dropdown`}
                        >
                          <div className="py-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`block px-4 py-2 text-sm font-medium text-sinfo-primary hover:bg-sinfo-light`}
                                role="menuitem"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // plain link
                const l = link as { href: string; label: string };
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`text-sm xl:text-base font-semibold tracking-wide transition-colors duration-200 ${
                      currPath === l.href
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
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
                className="laptop:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isExpanded ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation Menu */}
          {isExpanded && (
            <div className="laptop:hidden border-t border-white/10">
              <div className="py-3 sm:py-4 space-y-1 sm:space-y-2">
                {navLinks.map((link) => {
                  if ((link as any).children) {
                    const item = link as {
                      label: string;
                      children: { href: string; label: string }[];
                    };
                    return (
                      <div key={item.label} className="px-4">
                        <div className="px-0 py-2.5 text-sm font-semibold text-white">
                          {item.label}
                        </div>
                        <div className="space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsExpanded(false)}
                              className={`block pl-4 pr-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                                currPath === child.href
                                  ? "bg-white/10 text-white"
                                  : "text-white/80 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  const l = link as { href: string; label: string };
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setIsExpanded(false)}
                      className={`block px-4 py-2.5 sm:py-3 text-sm font-semibold rounded-lg transition-colors ${
                        currPath === l.href
                          ? "bg-white/10 text-white"
                          : "text-white/80 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {l.label}
                    </Link>
                  );
                })}
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
      {!isHomePage && <div className="h-14 sm:h-16 laptop:h-20" />}
    </>
  );
}
