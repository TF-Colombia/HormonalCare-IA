<template>
  <div class="check-in-page">
    <h1>{{ $t('checkIn.title') }}</h1>
    
    <section class="ticket-validation mt-4">
      <h2>{{ $t('checkIn.ticketValidation') }}</h2>
      
      <form @submit.prevent="handleCheckIn" class="flex flex-column gap-3">
        <div class="field">
          <label for="ticketIdentifier">{{ $t('checkIn.ticketIdentifier') }}</label>
          <pv-input-text
            id="ticketIdentifier"
            v-model="ticketIdentifier"
            :class="{ 'p-invalid': error }"
            aria-describedby="ticket-error"
          />
          <small id="ticket-error" class="p-error" v-if="error">{{ error }}</small>
        </div>
        
        <pv-button type="submit" :loading="loading">
          {{ $t('checkIn.checkInButton') }}
        </pv-button>
      </form>
      
      <div v-if="attendee" class="mt-4">
        <pv-card>
          <template #content>
            <div class="grid">
              <div class="col-12 md:col-6">
                <p><strong>{{ $t('checkIn.eventId') }}:</strong> {{ attendee.eventId }}</p>
                <p><strong>{{ $t('checkIn.eventName') }}:</strong> {{ event?.name }}</p>
                <p><strong>{{ $t('checkIn.eventDescription') }}:</strong> {{ event?.description }}</p>
              </div>
              <div class="col-12 md:col-6">
                <p><strong>{{ $t('checkIn.attendeeFirstName') }}:</strong> {{ attendee.firstName }}</p>
                <p><strong>{{ $t('checkIn.attendeeLastName') }}:</strong> {{ attendee.lastName }}</p>
                <p><strong>{{ $t('checkIn.checkedInAt') }}:</strong> {{ formatDate(attendee.checkedInAt) }}</p>
              </div>
            </div>
          </template>
        </pv-card>
      </div>
    </section>
  </div>
</template>

<script>
/**
 * @summary Page component for handling event check-ins
 * @author Your Name
 */
import { AttendeeService } from '../../shared/services/attendee.service'
import { EventService } from '../../shared/services/event.service'

export default {
  name: 'EventCheckInPage',
  data() {
    return {
      ticketIdentifier: '',
      loading: false,
      error: null,
      attendee: null,
      event: null
    }
  },
  methods: {
    async handleCheckIn() {
      this.loading = true
      this.error = null
      this.attendee = null
      this.event = null
      
      try {
        const attendee = await AttendeeService.getAttendeeByTicketIdentifier(this.ticketIdentifier)
        
        if (!attendee) {
          this.error = this.$t('checkIn.invalidTicket')
          return
        }
        
        if (attendee.checkedInAt) {
          this.error = this.$t('checkIn.alreadyCheckedIn')
          this.attendee = attendee
          this.event = await EventService.getEventById(attendee.eventId)
          return
        }
        
        const now = new Date().toISOString()
        const updatedAttendee = await AttendeeService.updateCheckIn(attendee.id, now)
        this.attendee = updatedAttendee
        this.event = await EventService.getEventById(attendee.eventId)
        this.ticketIdentifier = ''
      } catch (error) {
        console.error('Error during check-in:', error)
        this.error = this.$t('checkIn.invalidTicket')
      } finally {
        this.loading = false
      }
    },
    formatDate(date) {
      if (!date) return '-'
      return new Date(date).toLocaleString()
    }
  }
}
</script>

<style scoped>
.check-in-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.field {
  margin-bottom: 1rem;
}

.field label {
  display: block;
  margin-bottom: 0.5rem;
}
</style> 