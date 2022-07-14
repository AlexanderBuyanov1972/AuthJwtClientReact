export interface User {
    username: string;
    email: string;
    roles: string[]
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
    roles: string[];
}