"use client";

import { useEffect, useState } from "react";
import { format, subDays, addDays, parseISO } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CalendarDays, ChevronLeft, ChevronRight, EllipsisVertical, Video, BarChart3, FileText, FlaskConical } from "lucide-react";

interface Event {
  eventday: string;
  starthour: string;
  endhour: string;
  title: string;
  host: string;
  participant: string;
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDateDisplay, setCurrentDateDisplay] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  // Effect for current time and date display
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDateDisplay(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);  

    return () => clearInterval(intervalId);
  }, []);

  // Effect to fetch and filter events based on selected date
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/fake-events');
      const data: Event[] = await res.json();
      const selectedDateString = format(selectedDate, 'yyyy-MM-dd');
      const filteredEvents = data.filter(event => event.eventday === selectedDateString);
      setEvents(filteredEvents);
    };

    fetchEvents();
  }, [selectedDate]);

  const handlePreviousDay = () => {
    setSelectedDate(subDays(selectedDate, 1));
  };

  const handleNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  return (
    <div className="flex h-full flex-col bg-white text-black">
      <header className="flex items-center gap-4 border-b p-4">
        <SidebarTrigger className="md:hidden" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{currentTime}</h1>
          <p className="text-sm text-gray-400">{currentDateDisplay}</p>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="flex items-center gap-4 mb-6">
            <CalendarDays className="h-6 w-6 text-[#D7B9D5]" />
            <div className="flex items-center gap-2">
                <ChevronLeft className="h-5 w-5 text-gray-400 cursor-pointer hover:text-[#D7B9D5]" onClick={handlePreviousDay} />
                <span className="text-lg font-semibold">{format(selectedDate, 'EEEE, MMMM d')}</span> {/* Display the selected date */}
                <ChevronRight className="h-5 w-5 text-gray-400 cursor-pointer hover:text-[#D7B9D5]" onClick={handleNextDay}/>
            </div>
        </div>
        <div className="grid gap-4">
          {events.map((event, index) => (
            <Card key={index} className="bg-white border border-black text-black">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-sm text-gray-400">{format(parseISO(event.eventday), 'EEEE, d MMMM')}</p>
                  <p className="text-sm text-gray-400">{event.starthour} - {event.endhour}</p>
                  <p className="text-sm text-gray-400">Host: {event.host}</p>
                  <p className="text-sm text-gray-400">Participant: {event.participant}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Video className="h-6 w-6 text-[#D7B9D5] cursor-pointer hover:opacity-70" />
                    <EllipsisVertical className="h-6 w-6 text-gray-400 cursor-pointer hover:text-[#D7B9D5]" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
