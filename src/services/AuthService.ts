import $api, { CHECK, LOGIN, LOGOUT, REFRESH, REGISTRATION } from "../http";
import { AxiosResponse } from "axios";
import { IResponse } from "../models/Interfaces";

export default class AuthService {
    static async registration(username: string, email: string, password: string): Promise<AxiosResponse<IResponse>> {
        return $api.post<IResponse>(REGISTRATION, { username, email, password, role: "USER", isActivated: false })
    }

    static async login(email: string, password: string): Promise<AxiosResponse<IResponse>> {
        return $api.post<IResponse>(LOGIN, { email, password })
    }

    static async logout(): Promise<void> {
        $api.get<IResponse>(LOGOUT)
    }

    static async check(id: string): Promise<AxiosResponse<IResponse>> {
        return $api.get<IResponse>(`${CHECK}/${id}`)
    }

    static async refresh(): Promise<AxiosResponse<IResponse>> {
        return $api.get<IResponse>(REFRESH)
    }
}