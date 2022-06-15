export interface IResponse {
    data: IAuth;
    message: string;
    resultCode: number;
}

export interface IAuth {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface IUser {
    id: string;
    username: string;
    email: string;
    role: string
    isActivated: boolean;
}

