import axios from "axios";
import { toast } from "react-toastify";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (res) => {
    return res;
  },

  (err) => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.clear();

      window.location.href = "/login";
    }
    if (err.response?.status === 404) {
      toast.warning("Data not found 404 error");
    }
    return Promise.reject(err);
  }
);
