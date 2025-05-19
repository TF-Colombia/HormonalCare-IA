<template>
  <pv-card class="event-summary">
    <template #header>
      <h3>{{ event.name }}</h3>
    </template>
    
    <template #content>
      <p>{{ event.description }}</p>
    </template>
    
    <template #footer>
      <div class="flex justify-content-between">
        <div>
          <strong>{{ $t('home.registeredAttendees') }}:</strong>
          <span>{{ attendees.length }}</span>
        </div>
        <div>
          <strong>{{ $t('home.attendancePercentage') }}:</strong>
          <span>{{ attendancePercentage }}%</span>
        </div>
      </div>
    </template>
  </pv-card>
</template>

<script>
/**
 * @summary Component that displays a summary of an event in a card format
 * @author Your Name
 */
export default {
  name: 'EventSummary',
  props: {
    event: {
      type: Object,
      required: true
    },
    attendees: {
      type: Array,
      required: true
    }
  },
  computed: {
    attendancePercentage() {
      if (this.attendees.length === 0) return 0
      const checkedInCount = this.attendees.filter(attendee => attendee.checkedInAt).length
      return Math.round((checkedInCount / this.attendees.length) * 100)
    }
  }
}
</script>

<style scoped>
.event-summary {
  height: 100%;
}
</style> 