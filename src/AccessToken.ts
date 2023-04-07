

export default class AccessToken {

    private static _accessToken: string = ""

    static get accessToken() {
        return this._accessToken;
    }

    static get accessTokenHeader() {
        return {
            Authorization: `Bearer ${this._accessToken}`,
        }
    }

    static set accessToken(accessToken: string) {
        this._accessToken = accessToken;
    }
}