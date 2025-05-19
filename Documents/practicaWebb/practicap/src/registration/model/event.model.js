/**
 * @summary Event model class
 * @author Your Name
 */
export default class Event {
    /**
     * Create a new Event instance
     * @param {Object} eventData - Event data from API
     */
    constructor(eventData = {}) {
        this.id = eventData.id || null;
        this.name = eventData.name || '';
        this.description = eventData.description || '';
        this.scheduledAt = eventData.scheduledAt ? new Date(eventData.scheduledAt) : null;
    }

    /**
     * Create Event instances from API data
     * @param {Array} eventsData - Array of event data from API
     * @returns {Array} Array of Event instances
     */
    static fromJson(eventsData) {
        if (Array.isArray(eventsData)) {
            return eventsData.map(eventData => new Event(eventData));
        }
        return new Event(eventsData);
    }

    /**
     * Get formatted scheduled date
     * @param {string} locale - Locale for formatting
     * @returns {string} Formatted date
     */
    getFormattedDate(locale = 'en-US') {
        if (!this.scheduledAt) return '';

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        return this.scheduledAt.toLocaleString(locale, options);
    }
}