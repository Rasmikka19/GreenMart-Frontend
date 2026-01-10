import axios from 'axios';

const instance = axios.create({
    // 1. Explicitly point to your backend Render URL as a fallback
    baseURL: import.meta.env.VITE_API_URL || 'https://greenmart-backend-ttoh.onrender.com/api',
    
    // 2. CRUCIAL: Allow cookies/headers to be sent to the backend
    withCredentials: true, 
});

export default instance;