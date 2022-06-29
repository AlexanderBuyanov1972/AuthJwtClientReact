import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { IUser } from "../models/Interfaces";
import localStorageService from "../services/LocalStorageService";

export default class Store {
    user = {} as IUser
    isRegistered = false
    isLogin = false
    isAdmin = false

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
    setUser(user: IUser) {
        this.user = user
    }

    async registration(username: string, email: string, password: string) {
        try {
            const res = await AuthService.registration(username, email, password)
            if (res.status === 200) {
                this.setIsRegistered(true)
                this.setUser(res.data)
                if (res.data.role === "ADMIN")
                    this.setIsAdmin(true)
            } else {
                console.log("status : ", res.status)
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    async login(email: string, password: string) {
        try {
            const res = await AuthService.login(email, password)
            if (res.status === 200) {
                this.help(res)
                this.setIsLogin(true)
                if (res.data.role === "ADMIN")
                    this.setIsAdmin(true)
            } else {
                console.log("status : ", res.status)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async logout() {
        try {
            const res = await AuthService.logout()
            if (res.status === 200) {
                localStorageService.removeAccessToken()
                this.setIsLogin(false)
                this.setIsAdmin(false)
                this.setUser({} as IUser)
            } else {
                console.log("status : ", res.status)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async check(email: string) {
        try {
            if (email !== null && email !== undefined && email.length > 0) {
                const res = await AuthService.check(email)
                if (res.status === 200) {
                    localStorageService.setEmail(res.data.email)
                    this.setIsRegistered(true)
                    this.setUser(res.data)
                    if (res.data.role === "ADMIN") {
                        this.setIsAdmin(true)
                    }
                } else {
                    this.setIsRegistered(false)
                    this.setIsLogin(false)
                    this.setIsAdmin(false)
                    this.setUser({} as IUser)
                    localStorageService.removeEmail();
                    console.log("status : ", res.status)
                }
            } else {
                console.log("Email invalid in local storage")
            }
        } catch (error) {
            console.log(error);
        }
    }

    async refresh() {
        try {
            const res = await AuthService.refresh();
            res.status === 200 ? this.help(res) : console.log("status : ", res.status)
        } catch (error) {
            console.log(error);
        }

    }
    async refreshDouble(token: string) {
        try {
            const res = await AuthService.refreshDouble(token);
            res.status === 200 ? this.help(res) : console.log("status : ", res.status)
        } catch (error) {
            console.log(error);
        }

    }

    help(res: any) {
        localStorageService.setAccessToken(res.data.accessToken)
        localStorageService.setRefreshToken(res.data.refreshToken)
        localStorageService.setEmail(res.data.email)
    }


    // ***********************************  test ************************************

    async getAll() {
        const res = await AuthService.getAll();
        console.log(res.data)
    }
}