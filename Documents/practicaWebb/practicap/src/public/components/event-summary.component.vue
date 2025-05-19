<template>
  <div class="event-summary">
    <pv-card>
      <template #header>
        <h3>{{ event.name }}</h3>
      </template>

      <template #content>
        <p>{{ event.description }}</p>
      </template>

      <template #footer>
        <div class="grid">
          <div class="col-6 p-2 border-right-1 border-gray-200">
            <div class="text-center">
              <div class="font-bold mb-2">{{ $t('home.registeredAttendees') }}</div>
              <div class="text-xl">{{ getRegisteredAttendeesCount(event.id) }}</div>
            </div>
          </div>
          <div class="col-6 p-2">
            <div class="text-center">
              <div class="font-bold mb-2">{{ $t('home.attendancePercentage') }}</div>
              <div class="text-xl">{{ formatPercentage(getAttendancePercentage(event.id)) }}</div>
            </div>
          </div>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<script>
/**
 * @summary Component that displays summary information about an event
 * @author Your Name
 */
import AttendeeService from '../../registration/services/attendee.service.js';

export default {
  name: 'EventSummary',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      attendees: []
    }
  },
  async created() {
    try {
      // Get attendees for this specific event
      const response = await AttendeeService.getAttendeesByEventId(this.event.id);
      this.attendees = response.data;
    } catch (error) {
      console.error('Error loading attendees:', error);
    }
  },
  methods: {
    /**
     * Get the number of registered attendees for an event
     * @param {number} eventId - Event ID
     * @returns {number} Count of registered attendees
     */
    getRegisteredAttendeesCount(eventId) {
      return this.attendees.length;
    },

    /**
     * Calculate attendance percentage for an event
     * @param {number} eventId - Event ID
     * @returns {number} Attendance percentage (0-100)
     */
    getAttendancePercentage(eventId) {
      const totalAttendees = this.attendees.length;
      if (totalAttendees === 0) return 0;

      const checkedInAttendees = this.attendees.filter(a => a.checkedInAt !== null).length;
      return (checkedInAttendees / totalAttendees) * 100;
    },

    /**
     * Format a number as a percentage
     * @param {number} value - Value to format
     * @returns {string} Formatted percentage
     */
    formatPercentage(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value / 100);
    }
  }
}
</script>