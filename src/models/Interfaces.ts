export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
    message?: string;
} 

export interface IUser {
    id: string;
    username: string;
    email: string;
    role: string
    isActivated: boolean;
}