// src/api/axios.ts
import axios from "axios";
import getBackendHostBaseURL from "../utils/getHostBaseURL";
import { getUserId } from "../utils/auth";

const api = axios.create({
    baseURL: getBackendHostBaseURL(),
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔥 Automatically attach user_id to every request
api.interceptors.request.use(
    (config) => {
        const userId = getUserId();

        if (userId) {
            config.params = {
                ...(config.params || {}),
                user_id: userId,
            };
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
