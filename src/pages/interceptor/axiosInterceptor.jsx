import axios from "axios";

// Get API URL from environment variables
const baseURL =
  import.meta.env.VITE_BASE_URL ||
  "https://lovepelliapi-gdcmb2ezcvcmedew.eastus2-01.azurewebsites.net";

// Create axios instance
const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

//  Request Interceptor
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

//  Response Interceptor
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
