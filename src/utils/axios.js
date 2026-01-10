import axios from 'axios';

const instance = axios.create({
    // We are hardcoding the Render URL here to ensure it stops looking at localhost
    baseURL: 'https://greenmart-backend-ttoh.onrender.com/api',
    withCredentials: true, 
});

export default instance;