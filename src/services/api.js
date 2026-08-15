import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // Fail fast if backend is unresponsive — prevents the UI spinner from hanging forever.
    timeout: 30000, // 30 seconds
});

export default API;

