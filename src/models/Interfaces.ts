export interface ResponseEntity {
    data: IUser | string | null;
    headers: any;
    status: number;
}
export interface IUser {
    username: string;
    email: string;
    role: string
    isActivated: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegistrationRequest {
    username: string;
    email: string;
    password: string;
    role: string;
    isActivated: string;
}

export interface Store {
    user: IUser
    isRegistered: boolean
    isLogin: boolean
    isAdmin: boolean
}