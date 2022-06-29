import { $api, $apiAuth, CHECK, LOGIN, LOGOUT, REFRESH, REGISTRATION } from "../http/index";
import { AxiosResponse } from "axios";

export default class AuthService {
    static async registration(username: string, email: string, password: string): Promise<AxiosResponse> {
        return $api.post(REGISTRATION, { username, email, password })
    }

    static async login(email: string, password: string): Promise<AxiosResponse> {
        return $api.post(LOGIN, { email, password })
    }

    static async logout(): Promise<AxiosResponse> {
        return $apiAuth.get(LOGOUT)
    }

    static async check(email: string): Promise<AxiosResponse> {
        return $api.get(CHECK + "/" + email)
    }

    static async refresh(): Promise<AxiosResponse> {
        return $api.get(REFRESH)
    }

    static async refreshDouble(token: string): Promise<AxiosResponse> {
        return $api.get(REFRESH + "/" + token)
    }
    // ------------------------- test ---------------------------------

    static async getAll(): Promise<AxiosResponse> {
        return $apiAuth.get('/persons')
    }
}