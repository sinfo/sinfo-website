import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SINFO - Website",
    short_name: "SINFO",
    description: "SINFO Website",
    start_url: "/",
    display: "standalone",
    background_color: "#1c2b70", // SINFO Primary
    theme_color: "#1c2b70", // SINFO Primary
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
