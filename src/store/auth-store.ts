import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import localStorageService from "../services/LocalStorageService";

export default class AuthStore {
    isRegistered = false
    isLogin = false
    isAdmin = false
    error = ''

    constructor() {
        makeAutoObservable(this)
    }

    setIsRegistered(bool: boolean) {
        this.isRegistered = bool
    }
    setIsLogin(bool: boolean) {
        this.isLogin = bool
    }
    setIsAdmin(bool: boolean) {
        this.isAdmin = bool
    }
    setError(error: string) {
        this.error = error
    }

    async registration(username: string, email: string, password: string) {
        this.setError('')
        try {
            const res = await AuthService.registration(username, email, password)
            this.setIsRegistered(true)
            localStorageService.setEmail(res.data.user.email)
        } catch (error: any) {
            this.setError(error.message)
            console.log(error);
        }
    }

    async login(email: string, password: string) {
        this.setError('')
        try {
            const res = await AuthService.login(email, password)
            this.helpLocalStorage(res)
            this.setIsLogin(true)
            if (res.data.user.roles.includes('ADMIN'))
                this.setIsAdmin(true)
        } catch (error: any) {
            this.setError(error.message)
            console.log(error);
        }
    }

    async logout() {
        this.setError('')
        try {
            const res = await AuthService.logout()
            localStorageService.removeAccessToken()
            this.setIsLogin(false)
            this.setIsAdmin(false)
        } catch (error: any) {
            this.setError(error.message)
            console.log(error);
        }
    }

    async check(email: string) {
        this.setError('')
        try {
            if (email !== null && email !== undefined && email.length > 0) {
                const res = await AuthService.check(email)
                if (res.data.user) {
                    localStorageService.setEmail(res.data.user.email)
                    this.setIsRegistered(true)
                }

            }
        } catch (error: any) {
            this.setError(error.message)
            console.log(error);
        }
    }

    helpLocalStorage(res: any) {
        localStorageService.setAccessToken(res.data.accessToken)
        localStorageService.setRefreshToken(res.data.refreshToken)
        localStorageService.setEmail(res.data.user.email)
    }


    // ***********************************  test ************************************

    async getAll() {
        this.setError('')
        const res = await AuthService.getAll();
        console.log(res.data)
    }
}