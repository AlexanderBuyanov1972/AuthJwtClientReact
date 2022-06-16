import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { IUser} from "../models/Interfaces";
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
            const res = await AuthService.registration(username, email, password)
            if (res.data.resultCode !== 200) {
                this.setIsRegistered(true)
                return
            }
            LocalStorageService.setToken(res.data.data.accessToken);
            LocalStorageService.setId(res.data.data.user.id);
            this.setIsRegistered(true)
            this.setUser(res.data.data.user)
        } catch (error: any) {
            console.log(error);
        }
    }

    async login(email: string, password: string) {
        try {
            const res = await AuthService.login(email, password)
            LocalStorageService.setToken(res.data.data.accessToken)
            LocalStorageService.setId(res.data.data.user.id)
            this.setIsAuthorized(true)
            if (res.data.data.user.role === "ADMIN") {
                this.setIsAdmin(true)
            }
            this.setUser(res.data.data.user)
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
            const res = await AuthService.check(id)
            if (res.data.resultCode !== 200) {
                this.setIsRegistered(false)
                this.setIsAuthorized(false)
                this.setIsAdmin(false)
                this.setUser({} as IUser)
            } else {
                LocalStorageService.setId(res.data.data.user.id)
                this.setIsRegistered(true)
                this.setUser(res.data.data.user)
            }
        } catch (error) {
            console.log(error);
        } finally { }
    }

    async refresh() {
        try {
            const res = await AuthService.refresh();
            if (res.data.resultCode !== 200) {
                this.setIsRegistered(false)
                this.setIsAuthorized(false)
                this.setIsAdmin(false)
                this.setUser({} as IUser)
            } else {
                LocalStorageService.setToken(res.data.data.accessToken)
                LocalStorageService.setId(res.data.data.user.id)
                this.setIsRegistered(true)
                this.setIsAuthorized(true)
                if (res.data.data.user.role === "ADMIN") {
                    this.setIsAdmin(true);
                }
                this.setUser(res.data.data.user)
            }

        } catch (error) {
            console.log(error);
        } finally { }
    }

    async getAll(){
        const res = await AuthService.getAll();
        console.log(res)
    }
}