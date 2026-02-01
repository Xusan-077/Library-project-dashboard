import axios from "axios";

export const API = axios.create({
  baseURL: "https://infections-plays-sewing-finding.trycloudflare.com/api/v1",
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
    if (err.response?.status === 401) {
      localStorage.clear();

      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);
