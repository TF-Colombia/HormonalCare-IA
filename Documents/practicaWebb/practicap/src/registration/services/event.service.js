/**
 * @summary Service for handling event-related operations
 * @author Your Name
 */
import apiClient from '../../shared/services/http-client.service.js';

export default {
    /**
     * Get all events from the API
     * @returns {Promise} Promise with events data
     */
    getAllEvents() {
        return apiClient.get('/events');
    },

    /**
     * Get a specific event by ID
     * @param {number} id - Event ID
     * @returns {Promise} Promise with event data
     */
    getEventById(id) {
        return apiClient.get(`/events/${id}`);
    }
}