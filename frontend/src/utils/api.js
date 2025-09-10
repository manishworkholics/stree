import axios from "axios";

// Create an axios instance
const api = axios.create({
    baseURL: "http://localhost:4545/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});


// Add a request interceptor to include auth token if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // If using JWT auth
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Common API method
export const callApi = async (endpoint, method = "GET", data = null) => {
    try {
        const config = {
            url: endpoint,
            method,
        };

        // Sirf tabhi data bhejo jab actual me ho
        if (data !== null) {
            config.data = data;
        }

        const response = await api(config);
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export default api;