<template>
  <div class="home-page">
    <h1>{{ $t('home.welcome') }}</h1>
    
    <section class="registered-events mt-4">
      <h2>{{ $t('home.registeredEvents') }}</h2>
      <div class="grid">
        <div v-for="event in events" :key="event.id" class="col-12 md:col-6">
          <event-summary :event="event" :attendees="getEventAttendees(event.id)" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/**
 * @summary Home page component that displays the welcome message and registered events
 * @author Your Name
 */
import EventSummary from '../../shared/components/event-summary.component.vue'
import { EventService } from '../../shared/services/event.service'
import { AttendeeService } from '../../shared/services/attendee.service'

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
  methods: {
    async loadEvents() {
      try {
        this.events = await EventService.getEvents()
      } catch (error) {
        console.error('Error loading events:', error)
      }
    },
    async loadAttendees() {
      try {
        this.attendees = await AttendeeService.getAttendees()
      } catch (error) {
        console.error('Error loading attendees:', error)
      }
    },
    getEventAttendees(eventId) {
      return this.attendees.filter(attendee => attendee.eventId === eventId)
    }
  },
  async created() {
    await Promise.all([this.loadEvents(), this.loadAttendees()])
  }
}
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
</style> 