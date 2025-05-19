/**
 * @summary Service for handling attendee-related operations
 * @author Your Name
 */
import apiClient from '../../shared/services/http-client.service.js';

export default {
    /**
     * Get all attendees
     * @returns {Promise} Promise with attendees data
     */
    getAllAttendees() {
        return apiClient.get('/attendees');
    },

    /**
     * Get attendees by event ID
     * @param {number} eventId - Event ID
     * @returns {Promise} Promise with filtered attendees data
     */
    getAttendeesByEventId(eventId) {
        return apiClient.get(`/attendees?eventId=${eventId}`);
    },

    /**
     * Get attendee by ticket identifier
     * @param {string} ticketIdentifier - Ticket identifier
     * @returns {Promise} Promise with attendee data
     */
    getAttendeeByTicketIdentifier(ticketIdentifier) {
        return apiClient.get(`/attendees?ticketIdentifier=${ticketIdentifier}`);
    },

    /**
     * Update attendee check-in status
     * @param {number} id - Attendee ID
     * @param {object} attendeeData - Updated attendee data
     * @returns {Promise} Promise with updated attendee data
     */
    updateAttendee(id, attendeeData) {
        return apiClient.put(`/attendees/${id}`, attendeeData);
    }
}