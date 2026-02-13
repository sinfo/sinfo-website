"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const REFERRAL_SESSION_KEY = "referral_processed_refs";
const REQUEST_TIMEOUT = 5000;

interface ReferralPayload {
  ref: string;
}

/**
 * Custom hook to track referrals from URL query parameters.
 */
export function useReferral() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const ref = searchParams.get("ref");
    if (!ref) return;

    const raw = sessionStorage.getItem(REFERRAL_SESSION_KEY);
    let processedRefs: string[] = [];
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) processedRefs = parsed;
        else if (typeof parsed === "string") processedRefs = [parsed];
        else processedRefs = [];
      } catch {}
    }

    // If this ref was already processed this session, skip
    if (processedRefs.includes(ref)) return;

    processedRefs.push(ref);
    try {
      sessionStorage.setItem(
        REFERRAL_SESSION_KEY,
        JSON.stringify(processedRefs),
      );
    } catch {}

    // Use requestIdleCallback to defer API call until browser is idle
    // This keeps the main thread free for critical rendering work
    const scheduleReferralTracking = () => {
      const callback = () => {
        trackReferral(ref);
      };

      if ("requestIdleCallback" in window) {
        requestIdleCallback(callback, { timeout: 2000 });
      } else {
        // Fallback for browsers that don't support requestIdleCallback
        setTimeout(callback, 100);
      }
    };

    scheduleReferralTracking();

    // Remove only the 'ref' query parameter, keeping the current path and other params
    const params = new URLSearchParams(searchParams.toString());
    params.delete("ref");

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    router.replace(newUrl, { scroll: false });
  }, [searchParams, router]);
}

/**
 * Sends referral data to the external API with timeout and error handling.
 * Fails silently on errors to avoid disrupting user experience.
 */
async function trackReferral(ref: string): Promise<void> {
  const apiUrl = process.env.NEXT_PUBLIC_CANNON_URL;

  if (!apiUrl) return;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const payload: ReferralPayload = { ref };

    await fetch(`${apiUrl}/referrals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.debug("Referral tracking failed:", error);
    }
  } finally {
    clearTimeout(timeoutId);
  }
}
