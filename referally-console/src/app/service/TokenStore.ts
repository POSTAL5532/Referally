const jwtDecode = require('jwt-decode');

const sessionStorageKey = (window as any).env.SESSION_STORAGE_TOKEN_KEY;

/**
 * Утилитный класс для работы с токеном
 */
export class TokenStore {

    get tokenExists(): boolean {
        return !!this.token;
    }

    get token(): string {
        return sessionStorage.getItem(sessionStorageKey);
    }

    set token(token: string) {
        if (token && TokenStore.isValidToken(token)) {
            sessionStorage.setItem(sessionStorageKey, token);
            return;
        }
        throw new Error("Wrong token format");
    }

    removeToken() {
        sessionStorage.removeItem(sessionStorageKey);
    }

    private static isValidToken(token: string): boolean {
        try {
            jwtDecode(token);
            return true;
        } catch (e) {
            return false;
        }
    }

}
