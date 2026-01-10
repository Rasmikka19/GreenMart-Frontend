import axios from 'axios';

const instance = axios.create({
  // This pulls the URL from Render's Environment Variables
  baseURL: import.meta.env.VITE_API_URL || 'https://greenmart-backend-ttoh.onrender.com/api',
  withCredentials: true
});

export default instance;