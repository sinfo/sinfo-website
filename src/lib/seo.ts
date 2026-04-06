import type { Metadata } from "next";
import { headers } from "next/headers";

const defaultImage = "/images/pages/home.jpg";

function getSiteUrl(): string {
  try {
    const host = headers().get("host") ?? "sinfo.org";
    const proto = host.startsWith("localhost") ? "http" : "https";
    return `${proto}://${host}`;
  } catch {
    return "https://sinfo.org";
  }
}

export function createMetadata({
  title,
  description,
  path = "",
  image = defaultImage,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${path}`;
  const absoluteImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | SINFO`,
      description,
      url,
      images: [{ url: absoluteImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | SINFO`,
      description,
      images: [absoluteImage],
    },
    alternates: { canonical: url },
  };
}
