import axios from "axios";

export const BACKEND_URL = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace(/\/api$/, "") 
  : "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

export default axiosInstance;
