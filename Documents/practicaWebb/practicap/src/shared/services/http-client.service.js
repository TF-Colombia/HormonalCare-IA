
import axios from 'axios';

// Create a base axios instance with default configuration
const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;