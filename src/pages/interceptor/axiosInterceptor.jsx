import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "https://lovepelliapi-gdcmb2ezcvcmedew.eastus2-01.azurewebsites.net", // your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Request Interceptor
api.interceptors.request.use(
  (request) => {
    // Example: attach token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response Interceptor
api.interceptors.response.use(
  (response) => response, // Pass through success
  (error) => {
    if (error.response && error.response.status === 401) {
      // Example: auto logout
      console.log("Unauthorized! Redirecting to login...");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;