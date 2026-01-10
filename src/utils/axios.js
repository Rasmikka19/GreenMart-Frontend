import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://greenmart-backend-ttoh.onrender.com', //  Backend PORT
});

export default instance;