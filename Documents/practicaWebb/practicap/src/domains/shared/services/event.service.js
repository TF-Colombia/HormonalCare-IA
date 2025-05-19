/**
 * @summary Service for handling event-related API calls
 * @author Your Name
 */
import axios from 'axios'

const API_URL = 'http://localhost:3000'

export class EventService {
  /**
   * Get all events
   * @returns {Promise<Array>} Array of events
   */
  static async getEvents() {
    try {
      const response = await axios.get(`${API_URL}/events`)
      return response.data
    } catch (error) {
      console.error('Error fetching events:', error)
      throw error
    }
  }

  /**
   * Get a specific event by ID
   * @param {number} id - The event ID
   * @returns {Promise<Object>} Event object
   */
  static async getEventById(id) {
    try {
      const response = await axios.get(`${API_URL}/events/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching event ${id}:`, error)
      throw error
    }
  }
} 