import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 10_000,
    headers: {
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('cm:token');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
},
    (error) => {
        {
            return Promise.reject(error)
        }
    })