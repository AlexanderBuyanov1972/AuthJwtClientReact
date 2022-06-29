import axios from "axios";
import AuthService from "../services/AuthService";
import LocalStorageService from "../services/LocalStorageService";
import localStorageService from "../services/LocalStorageService";

//export const SERVER = "http://localhost:5000"
export const SERVER = "http://localhost:8080";

export const REGISTRATION = "/registration"
export const LOGIN = "/login"
export const LOGOUT = "/exit"
export const REFRESH = "/refresh"
export const CHECK = "/check"
export const ACTIVATE = "/activate"

export const $api = axios.create({
    baseURL: SERVER,
})

export const $apiAuth = axios.create({
    baseURL: SERVER,
})

$apiAuth.interceptors.request.use((config) => {
    if (config.headers)
        config.headers.Authorization = `Bearer ${localStorageService.getAccessToken()}`
    return config
})

$apiAuth.interceptors.response.use((config) => { return config }, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const res = await AuthService.refresh();
            return $apiAuth.request(originalRequest)
        } catch (error) {
            console.log('User not authorized. Send double refresh request.')
            try {
                const token = localStorageService.getRefreshToken();
                const res = await AuthService.refreshDouble(token);
                return $apiAuth.request(originalRequest)
            } catch (error) {
                console.log('User not authorized')
            }
        }
    }
    throw error
})

export default { $api, $apiAuth }