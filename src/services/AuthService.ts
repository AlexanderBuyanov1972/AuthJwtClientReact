import { AxiosResponse } from "axios";
import { $api, $apiAuth, CHECK, LOGIN, LOGOUT, REFRESH, REGISTRATION } from "../http/index";
import { User } from "../models/Interfaces";
import LocalStorageService from "./LocalStorageService";

export default class AuthService {
    static async registration(username: string, email: string, password: string): Promise<AxiosResponse> {
        return $api.post<User>(REGISTRATION, { username, email, password, roles: ['USER'] })
    }

    static async login(email: string, password: string): Promise<AxiosResponse> {
        return $api.post(LOGIN, { email, password })
    }

    static async logout(): Promise<AxiosResponse> {
        return $apiAuth.get(LOGOUT)
    }

    static async check(email: string): Promise<AxiosResponse> {
        return $apiAuth.get(CHECK + "/" + email)
    }

    static async refresh() {
        const refreshToken = LocalStorageService.getRefreshToken()
        const res: any = await $api.get(REFRESH + "/" + refreshToken)
        LocalStorageService.setAccessToken(res.data.accessToken)
        LocalStorageService.setRefreshToken(res.data.refreshToken)
        LocalStorageService.setEmail(res.data.user.email)
       
    }
    // ------------------------- test ---------------------------------

    static async getAll(): Promise<AxiosResponse> {
        return $apiAuth.get('/all')
    }
}