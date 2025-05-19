<template>
  <div class="home-page">
    <h1>{{ $t('home.welcome') }}</h1>

    <div class="mt-4">
      <h2>{{ $t('home.registeredEvents') }}</h2>

      <div class="grid">
        <div v-for="event in events" :key="event.id" class="col-12 md:col-6 lg:col-6">
          <event-summary :event="event" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @summary Home page component that displays all registered events
 * @author Your Name
 */
import EventSummary from '../components/event-summary.component.vue';
import EventService from '../../registration/services/event.service.js';
import AttendeeService from '../../registration/services/attendee.service.js';

export default {
  name: 'HomePage',
  components: {
    EventSummary
  },
  data() {
    return {
      events: [],
      attendees: []
    }
  },
  async created() {
    try {
      // Fetch events and attendees data
      const [eventsResponse, attendeesResponse] = await Promise.all([
        EventService.getAllEvents(),
        AttendeeService.getAllAttendees()
      ]);

      this.events = eventsResponse.data;
      this.attendees = attendeesResponse.data;
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
}
</script>