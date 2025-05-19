/**
 * @summary Analytics service for calculating event statistics
 * @author Your Name
 */

/**
 * Calculate attendance percentage for an event
 * @param {Array} attendees - Array of attendees for the event
 * @returns {number} Percentage of attendees checked in (0-100)
 */
const calculateAttendancePercentage = (attendees) => {
    if (!attendees || attendees.length === 0) return 0;

    // Count checked-in attendees using filter
    const checkedInCount = attendees.filter(attendee => attendee.checkedInAt !== null).length;

    // Calculate percentage
    return (checkedInCount / attendees.length) * 100;
};

/**
 * Format a number as a percentage string
 * @param {number} value - Value to format (0-100)
 * @param {string} locale - Locale for formatting
 * @returns {string} Formatted percentage string
 */
const formatPercentage = (value, locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value / 100);
};

/**
 * Group attendees by event ID
 * @param {Array} attendees - Array of all attendees
 * @returns {Object} Object with event IDs as keys and arrays of attendees as values
 */
const groupAttendeesByEvent = (attendees) => {
    return attendees.reduce((groups, attendee) => {
        const eventId = attendee.eventId;
        if (!groups[eventId]) {
            groups[eventId] = [];
        }
        groups[eventId].push(attendee);
        return groups;
    }, {});
};

/**
 * Get event statistics
 * @param {Array} attendees - Array of attendees for the event
 * @returns {Object} Object with statistics (totalCount, checkedInCount, attendancePercentage)
 */
const getEventStatistics = (attendees) => {
    if (!attendees || attendees.length === 0) {
        return {
            totalCount: 0,
            checkedInCount: 0,
            attendancePercentage: 0
        };
    }

    const checkedInCount = attendees.filter(attendee => attendee.checkedInAt !== null).length;
    const attendancePercentage = calculateAttendancePercentage(attendees);

    return {
        totalCount: attendees.length,
        checkedInCount,
        attendancePercentage
    };
};

export default {
    calculateAttendancePercentage,
    formatPercentage,
    groupAttendeesByEvent,
    getEventStatistics
};