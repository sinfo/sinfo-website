import React, { ReactNode } from "react";
import Link from "next/link";

interface CallToActionProps {
  children: ReactNode;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  badge?: ReactNode;
  variant?: "primary" | "secondary";
}

export default function CallToAction({
  children,
  href,
  badge,
  variant = "primary",
  target,
}: CallToActionProps) {
  const baseClasses =
    "inline-flex items-center gap-2 sm:gap-3 rounded-full px-4 sm:px-5 py-1.5 shadow-lg font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200";
  const variantClasses =
    variant === "primary"
      ? "bg-sinfo-primary text-white hover:bg-sinfo-primary/90"
      : "bg-white text-sinfo-primary hover:bg-sinfo-light";
  const badgeClasses =
    "inline-block rounded-full bg-sinfo-primary/10 text-sinfo-primary px-2 sm:px-3 py-0.5 ml-1 sm:ml-2 text-xs font-medium";

  const content = (
    <>
      <span>{children}</span>
      {badge && <span className={badgeClasses}>{badge}</span>}
    </>
  );

  return href ? (
    <Link href={href} target={target}>
      <button className={`${baseClasses} ${variantClasses}`}>{content}</button>
    </Link>
  ) : (
    <div className={`${baseClasses} bg-white/95 backdrop-blur-sm`}>
      {content}
    </div>
  );
}
