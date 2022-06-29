export default class LocalStorageService {

    static ACCESS_TOKEN = 'accessToken'
    static REFRESH_TOKEN = 'refreshToken'
    static EMAIL = 'email'

    static setAccessToken(value: string): void {
        localStorage.setItem(LocalStorageService.ACCESS_TOKEN, value)
    }
    static setRefreshToken(value: string): void {
        localStorage.setItem(LocalStorageService.REFRESH_TOKEN, value)
    }
    static setEmail(value: string): void {
        localStorage.setItem(LocalStorageService.EMAIL, value)
    }

    static getAccessToken(): string {
        let token = localStorage.getItem(LocalStorageService.ACCESS_TOKEN);
        return token !== null && token.length > 7 && token !== undefined ? token : ""
    }
    static getRefreshToken(): string {
        let token = localStorage.getItem(LocalStorageService.REFRESH_TOKEN);
        return token !== null && token.length > 7 && token !== undefined ? token : ""
    }
    static getEmail(): string {
        let email = localStorage.getItem(LocalStorageService.EMAIL);
        return email !== null && email.length > 0 && email !== undefined ? email : ""
    }

    static removeAccessToken(): void {
        localStorage.removeItem(LocalStorageService.ACCESS_TOKEN)
    }
    static removeRefreshToken(): void {
        localStorage.removeItem(LocalStorageService.REFRESH_TOKEN)
    }
    static removeEmail(): void {
        localStorage.removeItem(LocalStorageService.EMAIL)
    }
}