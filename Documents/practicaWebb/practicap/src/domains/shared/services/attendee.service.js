/**
 * @summary Service for handling attendee-related API calls
 * @author Your Name
 */
import axios from 'axios'

const API_URL = 'http://localhost:3000'

export class AttendeeService {
  /**
   * Get all attendees
   * @returns {Promise<Array>} Array of attendees
   */
  static async getAttendees() {
    try {
      const response = await axios.get(`${API_URL}/attendees`)
      return response.data
    } catch (error) {
      console.error('Error fetching attendees:', error)
      throw error
    }
  }

  /**
   * Get attendee by ticket identifier
   * @param {string} ticketIdentifier - The ticket identifier
   * @returns {Promise<Object>} Attendee object
   */
  static async getAttendeeByTicketIdentifier(ticketIdentifier) {
    try {
      const response = await axios.get(`${API_URL}/attendees?ticketIdentifier=${ticketIdentifier}`)
      return response.data[0] || null
    } catch (error) {
      console.error('Error fetching attendee by ticket:', error)
      throw error
    }
  }

  /**
   * Update attendee check-in status
   * @param {number} id - The attendee ID
   * @param {string} checkedInAt - The check-in timestamp
   * @returns {Promise<Object>} Updated attendee object
   */
  static async updateCheckIn(id, checkedInAt) {
    try {
      const response = await axios.patch(`${API_URL}/attendees/${id}`, { checkedInAt })
      return response.data
    } catch (error) {
      console.error('Error updating attendee check-in:', error)
      throw error
    }
  }
} 