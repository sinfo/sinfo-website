"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { EventService } from "@/services/EventService";

interface EventContextType {
  event: SINFOEvent | null;
  loading: boolean;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({
  children,
  initialEvent,
}: {
  children: ReactNode;
  // optional server-provided initial event for SSR
  initialEvent?: SINFOEvent | null;
}) => {
  const [event, setEvent] = useState<SINFOEvent | null>(initialEvent ?? null);
  const [loading, setLoading] = useState(initialEvent ? false : true);

  useEffect(() => {
    // if an initial event was provided from server, skip client fetch
    if (initialEvent) return;

    const fetchEvent = async () => {
      try {
        const eventData = await EventService.getLatest();
        setEvent(eventData);
      } catch (error) {
        console.error("Failed to fetch event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [initialEvent]);

  return (
    <EventContext.Provider value={{ event, loading }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};
