"use client";

import { Suspense } from "react";
import { useReferral } from "@/hooks/useReferral";

/**
 * Internal component that uses the referral hook.
 * Wrapped in Suspense boundary to handle useSearchParams safely.
 */
function ReferralTrackerInternal() {
  useReferral();
  return null;
}

export default function ReferralTracker() {
  return (
    <Suspense fallback={null}>
      <ReferralTrackerInternal />
    </Suspense>
  );
}
