import type { Metadata } from "next";

const siteUrl = "https://sinfo.org";
const defaultImage = "/images/pages/home.png";

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
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | SINFO`,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | SINFO`,
      description,
      images: [image],
    },
    alternates: { canonical: url },
  };
}
