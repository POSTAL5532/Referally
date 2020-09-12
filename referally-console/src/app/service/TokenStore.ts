const jwtDecode = require('jwt-decode');

const sessionStorageKey = (window as any).env.SESSION_STORAGE_TOKEN_KEY;

/**
 * Утилитный класс для работы с токеном
 */
export class TokenStore {

    /**
     * Проверяет наличия токена
     */
    get tokenExists(): boolean {
        return !!this.token;
    }

    /**
     * Возвращает токен
     */
    get token(): string {
        return sessionStorage.getItem(sessionStorageKey);
    }

    /**
     * Устанавливает токен в storage
     *
     * @param token
     */
    set token(token: string) {
        if (token && TokenStore.isValidToken(token)) {
            sessionStorage.setItem(sessionStorageKey, token);
            return;
        }
        throw new Error("Wrong token format");
    }

    /**
     * Удаляет токен из storage.
     */
    removeToken() {
        sessionStorage.removeItem(sessionStorageKey);
    }

    /**
     * Проверяет валидность токена
     *
     * @param token
     */
    private static isValidToken(token: string): boolean {
        try {
            jwtDecode(token);
            return true;
        } catch (e) {
            return false;
        }
    }

}
