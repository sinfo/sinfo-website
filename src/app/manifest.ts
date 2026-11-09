import type { MetadataRoute } from "next";
import { sinfoColors } from "@/constants/colors";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SINFO | Portugal's Biggest Free Tech Conference",
    short_name: "SINFO",
    description:
      "SINFO is Portugal's biggest free technology conference, held annually at Técnico Innovation Center in Lisbon.",
    start_url: "/",
    display: "standalone",
    background_color: sinfoColors.primary,
    theme_color: sinfoColors.primary,
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
