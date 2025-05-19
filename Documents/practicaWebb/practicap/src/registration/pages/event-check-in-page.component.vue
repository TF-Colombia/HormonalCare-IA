<template>
  <div class="p-6">
    <h1>{{ $t('checkIn.title') }}</h1>

    <div class="card mt-4">
      <h2>{{ $t('checkIn.ticketValidation') }}</h2>

      <div class="p-fluid">
        <div class="field">
          <label for="ticketIdentifier">{{ $t('checkIn.ticketIdentifier') }}</label>
          <pv-input-text id="ticketIdentifier" v-model="ticketIdentifier" aria-describedby="ticket-help" />
        </div>

        <div class="field">
          <pv-button
              :label="$t('checkIn.checkInButton')"
              @click="validateTicket"
              aria-label="Validate ticket and check in"
          />
        </div>
      </div>

      <!-- Results section -->
      <div v-if="validationMessage" class="mt-4 p-3" :class="validationStatus === 'error' ? 'bg-red-50' : 'bg-green-50'">
        <p>{{ validationMessage }}</p>
      </div>

      <!-- Attendee details -->
      <div v-if="validationStatus === 'success'" class="mt-4">
        <div class="grid">
          <div class="col-12 md:col-6">
            <p><strong>{{ $t('checkIn.eventId') }}:</strong> {{ event.id }}</p>
            <p><strong>{{ $t('checkIn.eventName') }}:</strong> {{ event.name }}</p>
            <p><strong>{{ $t('checkIn.eventDescription') }}:</strong> {{ event.description }}</p>
          </div>
          <div class="col-12 md:col-6">
            <p><strong>{{ $t('checkIn.attendeeFirstName') }}:</strong> {{ attendee.firstName }}</p>
            <p><strong>{{ $t('checkIn.attendeeLastName') }}:</strong> {{ attendee.lastName }}</p>
            <p><strong>{{ $t('checkIn.checkedInAt') }}:</strong> {{ formatDateTime(attendee.checkedInAt) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @summary Event check-in page that validates tickets and processes attendee check-ins
 * @author Your Name
 */
import AttendeeService from '../services/attendee.service.js';
import EventService from '../services/event.service.js';

export default {
  name: 'EventCheckInPage',
  data() {
    return {
      ticketIdentifier: '',
      attendee: null,
      event: null,
      validationMessage: '',
      validationStatus: null  // 'success', 'error', or null
    }
  },
  methods: {
    /**
     * Validate a ticket and process check-in
     */
    async validateTicket() {
      if (!this.ticketIdentifier) return;

      try {
        // Find attendee by ticket identifier
        const response = await AttendeeService.getAttendeeByTicketIdentifier(this.ticketIdentifier);
        const attendees = response.data;

        if (attendees.length === 0) {
          this.validationMessage = this.$t('checkIn.invalidTicket');
          this.validationStatus = 'error';
          this.attendee = null;
          this.event = null;
          return;
        }

        // Get the first matching attendee
        const attendee = attendees[0];

        // Check if already checked in
        if (attendee.checkedInAt) {
          this.validationMessage = this.$t('checkIn.alreadyCheckedIn');
          this.validationStatus = 'error';
          this.attendee = attendee;

          // Get event details
          const eventResponse = await EventService.getEventById(attendee.eventId);
          this.event = eventResponse.data;
          return;
        }

        // Process check-in by updating attendee
        const now = new Date().toISOString();
        const updatedAttendee = { ...attendee, checkedInAt: now };

        await AttendeeService.updateAttendee(attendee.id, updatedAttendee);

        // Get event details
        const eventResponse = await EventService.getEventById(attendee.eventId);

        // Update local state
        this.attendee = updatedAttendee;
        this.event = eventResponse.data;
        this.validationStatus = 'success';
        this.validationMessage = '';

      } catch (error) {
        console.error('Error validating ticket:', error);
        this.validationMessage = 'An error occurred while processing your request.';
        this.validationStatus = 'error';
      }
    },

    /**
     * Format a date and time string
     * @param {string} dateTimeString - ISO date time string
     * @returns {string} Formatted date time string
     */
    formatDateTime(dateTimeString) {
      if (!dateTimeString) return '';

      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };

      return new Date(dateTimeString).toLocaleString(this.$i18n.locale, options);
    }
  }
}
</script>