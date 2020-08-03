
/**
 * Информация о токене.
 */
export class TokenInformation {
    accessToken: string;
    tokenType: string;

    public static deserialize(data: any): TokenInformation {
        const tokenInformation = new TokenInformation();
        tokenInformation.accessToken = data['access_token'];
        tokenInformation.tokenType = data['token_type'];
        return tokenInformation;
    }
}
