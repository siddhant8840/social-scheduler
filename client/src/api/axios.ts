import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://social-media-scheduler-q58b.onrender.com"
})

export default api;
