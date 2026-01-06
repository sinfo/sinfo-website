import type { Metadata, Viewport } from "next";
import Toolbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { EventProvider } from "@/context/EventContext";
import { EventService } from "@/services/EventService";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SINFO Website",
  description: "SINFO Website",
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
