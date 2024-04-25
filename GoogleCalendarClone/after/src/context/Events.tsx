import { createContext, useState } from "react";
import { UnionOmit } from "../utils/types";
import { EVENT_COLORS } from "./useEvent";

export type Event = {
  id: string;
  name: string;
  color: (typeof EVENT_COLORS)[number];
  date: Date;
} & (
  | { allDay: false; startTime: string; endTime: string }
  | { allDay: true; startTime?: never; endTime?: never }
);

type EventContext = {
  events: Event[];
  addEvent: (event: UnionOmit<Event, "id">) => void;
};

export const Context = createContext<EventContext | null>(null);

type EventsProviderProps = {
  children: React.ReactNode;
};

export function EventsProvider({ children }: EventsProviderProps) {
  const [events, setEvents] = useState<Event[]>([]);

  function addEvent(event: UnionOmit<Event, "id">) {
    setEvents((e) => [...e, { ...event, id: crypto.randomUUID() }]);
  }

  return (
    <Context.Provider value={{ events, addEvent }}>{children}</Context.Provider>
  );
}
