import $api, { CHECK, LOGIN, LOGOUT, REFRESH, REGISTRATION } from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/Interfaces";

export default class AuthService {
    static async registration(username: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(REGISTRATION, { username, email, password, role: "USER", isActivated: false })
    }

    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(LOGIN, { email, password })
    }

    static async logout(): Promise<void> {
        $api.get<AuthResponse>(LOGOUT)
    }

    static async check(id: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.get<AuthResponse>(`${CHECK}/${id}`)
    }

    static async refresh(): Promise<AxiosResponse<AuthResponse>> {
        return $api.get<AuthResponse>(REFRESH)
    }
}