import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5001',
});

export const getStatus = () => API.get('/status');
export const addTickets = (vendorId, count) => API.post('/vendor/add', { vendorId, count });
export const purchaseTickets = (customerId, count) => API.post('/customer/buy', { customerId, count });
export const updateConfig = (newConfig) => API.post('/config', newConfig);
