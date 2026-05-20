import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Otomatis mengarah ke endpoint API Laravel kita
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

// Interceptor otomatis menyisipkan Token JWT pada header Authorization di setiap request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Jika backend merespons 401 (Token hangus), otomatis bersihkan sesi frontend
api.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('jwt_token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default api;