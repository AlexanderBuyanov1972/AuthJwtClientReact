import { AuthResponse } from "../models/Interfaces"

export default class LocalStorageService {

    static setToken(value: string): void {
        localStorage.setItem('token', value)
    }
    static setId(value: string): void {
        localStorage.setItem('id', value)
    }
    static getToken(): void {
        localStorage.getItem('token')
    }
    static getId() {
        return localStorage.getItem('id')
    }
    static removeToken(): void {
        localStorage.removeItem('token')
    }
    static removeId(): void {
        localStorage.removeItem('id')
    }
}