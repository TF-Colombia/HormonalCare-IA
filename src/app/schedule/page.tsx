"use client";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useEffect, useState } from 'react';


export default function SchedulePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/fake-events')
      .then(res => res.json())
      .then(data => {
        // Adaptar los datos al formato de FullCalendar
        const mapped = data.map(ev => ({
          title: `${ev.title} - ${ev.participant}`,
          start: `${ev.eventday}T${ev.starthour}`,
          end: `${ev.eventday}T${ev.endhour}`,
          extendedProps: {
            host: ev.host,
            participant: ev.participant
          }
        }));
        setEvents(mapped);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Schedule</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        height="auto"
        events={events}
      />
    </div>
  );
}
