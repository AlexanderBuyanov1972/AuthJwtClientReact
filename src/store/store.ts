import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { IUser } from "../models/Interfaces";
import LocalStorageService from "../services/LocalStorageService";

export default class Store {
    user = {} as IUser;
    isRegistered = false
    isAuthorized = false;
    isAdmin = false;
    constructor() {
        makeAutoObservable(this)
    }
    setIsRegistered(bool: boolean) {
        this.isRegistered = bool
    }
    setIsAuthorized(bool: boolean) {
        this.isAuthorized = bool
    }
    setIsAdmin(bool: boolean) {
        this.isAdmin = bool
    }
    setUser(user: IUser) {
        this.user = user
    }
    async registration(username: string, email: string, password: string) {
        try {
            const { data } = await AuthService.registration(username, email, password)
            if (data.message) {
                this.setIsRegistered(true)
                return
            }
            LocalStorageService.setToken(data.accessToken);
            LocalStorageService.setId(data.user.id);
            this.setIsRegistered(true)
            this.setUser(data.user)
        } catch (error: any) {
            console.log(error);
        }
    }

    async login(email: string, password: string) {
        try {
            const { data } = await AuthService.login(email, password)
            LocalStorageService.setToken(data.accessToken)
            LocalStorageService.setId(data.user.id)
            this.setIsAuthorized(true)
            if (data.user.role === "ADMIN") {
                this.setIsAdmin(true)
            }
            this.setUser(data.user)
        } catch (error) {
            console.log(error);
        }
    }

    async logout() {
        try {
            await AuthService.logout()
            LocalStorageService.removeToken()
            this.setIsAdmin(false)
            this.setIsAuthorized(false)
            this.setUser({} as IUser)
        } catch (error) {
            console.log(error);
        }
    }

    async check(id: string) {
        try {
            const { data } = await AuthService.check(id)
            if (data.message === "") {
                this.setIsRegistered(false)
                this.setIsAuthorized(false)
                this.setIsAdmin(false)
                this.setUser({} as IUser)
            } else {
                // LocalStorageService.setToken(data.accessToken)
                LocalStorageService.setId(data.user.id)
                this.setIsRegistered(true)
                this.setUser(data.user)
            }
        } catch (error) {
            console.log(error);
        } finally { }
    }

    async refresh() {
        try {
            const { data } = await AuthService.refresh();
            if (data.message) {
                this.setIsRegistered(false)
                this.setIsAuthorized(false)
                this.setIsAdmin(false)
                this.setUser({} as IUser)
            } else {
                LocalStorageService.setToken(data.accessToken)
                LocalStorageService.setId(data.user.id)
                this.setIsRegistered(true)
                this.setIsAuthorized(true)
                if (data.user.role === "ADMIN") {
                    this.setIsAdmin(true);
                }
                this.setUser(data.user)
            }

        } catch (error) {
            console.log(error);
        } finally { }
    }
}