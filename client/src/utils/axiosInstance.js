import axios from "axios";
const baseURL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
});

// **Request Interceptor to Add Token**
axiosInstance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    // console.log(token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// **Response Interceptor to Auto Refresh Token**
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 403) {
            try {
                const res = await axios.post(`${baseURL}/admin/refresh-token`, {}, { withCredentials: true });
                sessionStorage.setItem("token", res.data.accessToken);
                error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
                return axios(error.config);
            } catch (err) {
                console.error("Session Expired! Please login again.");
                sessionStorage.removeItem("token");
                window.location.href = "/admin/login";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
