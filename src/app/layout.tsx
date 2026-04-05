import type { Metadata, Viewport } from "next";
import Toolbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import ReferralTracker from "@/components/ReferralTracker";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { EventProvider } from "@/context/EventContext";
import { EventService } from "@/services/EventService";

const montserrat = Montserrat({ subsets: ["latin"] });

const siteUrl = "https://sinfo.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SINFO — Portugal's Biggest Free Tech Conference",
    template: "%s | SINFO",
  },
  description:
    "SINFO is Portugal's biggest free technology conference, held annually at Instituto Superior Técnico in Lisbon. Join thousands of tech enthusiasts, industry leaders, and innovators.",
  keywords: [
    "SINFO",
    "tech conference",
    "Portugal",
    "Lisbon",
    "IST",
    "technology",
    "speakers",
    "innovation",
    "free conference",
  ],
  authors: [{ name: "SINFO", url: siteUrl }],
  creator: "SINFO",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "SINFO",
    title: "SINFO — Portugal's Biggest Free Tech Conference",
    description:
      "SINFO is Portugal's biggest free technology conference, held annually at Instituto Superior Técnico in Lisbon. Join thousands of tech enthusiasts, industry leaders, and innovators.",
    images: [
      {
        url: "/images/pages/home.jpg",
        width: 1200,
        height: 630,
        alt: "SINFO — Portugal's Biggest Free Tech Conference",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SINFO — Portugal's Biggest Free Tech Conference",
    description:
      "SINFO is Portugal's biggest free technology conference, held annually at Instituto Superior Técnico in Lisbon.",
    images: ["/images/pages/home.jpg"],
    creator: "@sinfosl",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const event = await EventService.getLatest();

  return (
    <html lang="en" className="bg-sinfo-primary">
      <body className={montserrat.className}>
        <EventProvider initialEvent={event}>
          <ReferralTracker />
          <div className="min-h-dvh text-white flex flex-col">
            <Toolbar />
            <div className="flex-1 bg-gray-100 text-black">{children}</div>
            <BottomNavbar />
          </div>
        </EventProvider>
      </body>
    </html>
  );
}
