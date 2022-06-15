import axios from "axios";
import AuthService from "../services/AuthService";
import LocalStorageService from "../services/LocalStorageService";

export const SERVER = "http://localhost:5000"
export const REGISTRATION = "/registration"
export const LOGIN = "/login"
export const LOGOUT = "/logout"
export const REFRESH = "/refresh"
export const CHECK = "/check"

const $api = axios.create({
    withCredentials: true,
    baseURL: SERVER,

})

$api.interceptors.request.use((config) => {
    if (config.headers)
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const res = await AuthService.refresh();
            LocalStorageService.setToken( res.data.data.accessToken);
           LocalStorageService.setId(res.data.data.user.id);
            return $api.request(originalRequest)
        } catch (error) {
            console.log('User not authorized')
        }
    }
    throw error
})

export default $api