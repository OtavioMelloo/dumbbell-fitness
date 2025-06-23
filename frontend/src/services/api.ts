import axios from 'axios';

const api = axios.create({
    baseURL: "https://seu-backend-na-railway.app/api",
    headers: {
        "Content-Type": "application/json"
    },
});

export default api;