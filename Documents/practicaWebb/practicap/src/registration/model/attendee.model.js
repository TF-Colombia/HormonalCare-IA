/**
 * @summary Attendee model class
 * @author Your Name
 */
export default class Attendee {
    /**
     * Create a new Attendee instance
     * @param {Object} attendeeData - Attendee data from API
     */
    constructor(attendeeData = {}) {
        this.id = attendeeData.id || null;
        this.firstName = attendeeData.firstName || '';
        this.lastName = attendeeData.lastName || '';
        this.eventId = attendeeData.eventId || null;
        this.ticketIdentifier = attendeeData.ticketIdentifier || '';
        this.checkedInAt = attendeeData.checkedInAt ? new Date(attendeeData.checkedInAt) : null;
    }

    /**
     * Create Attendee instances from API data
     * @param {Array} attendeesData - Array of attendee data from API
     * @returns {Array} Array of Attendee instances
     */
    static fromJson(attendeesData) {
        if (Array.isArray(attendeesData)) {
            return attendeesData.map(attendeeData => new Attendee(attendeeData));
        }
        return new Attendee(attendeesData);
    }

    /**
     * Get full name of attendee
     * @returns {string} Full name (firstName + lastName)
     */
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    /**
     * Check if the attendee has checked in
     * @returns {boolean} True if checked in, false otherwise
     */
    isCheckedIn() {
        return this.checkedInAt !== null;
    }

    /**
     * Get formatted check-in date
     * @param {string} locale - Locale for formatting
     * @returns {string} Formatted date or empty string if not checked in
     */
    getFormattedCheckInTime(locale = 'en-US') {
        if (!this.checkedInAt) return '';

        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        return this.checkedInAt.toLocaleString(locale, options);
    }

    /**
     * Convert to JSON for API
     * @returns {Object} JSON representation for API
     */
    toJson() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            eventId: this.eventId,
            ticketIdentifier: this.ticketIdentifier,
            checkedInAt: this.checkedInAt ? this.checkedInAt.toISOString() : null
        };
    }
}