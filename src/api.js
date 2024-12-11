import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5001',
});

export const getStatus = () => API.get('/status');
export const startSystem = () => API.post('/start');
export const stopSystem = () => API.post('/stop');
export const updateConfig = (config) => API.post('/config', config);
