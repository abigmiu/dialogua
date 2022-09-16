import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3008/api',
    timeout: 10000,
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers['authorizations'] = `Bearer ${token}`;
    }

    return config;
});
instance.interceptors.response.use((response) => {
    return response;
});

export const http = instance;
