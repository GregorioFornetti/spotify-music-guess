

export default class AccessToken {

    private static _accessToken: string = ""
    private static _country: string = ""

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

    static get country() {
        return this._country;
    }

    static set country(country: string) {
        this._country = country;
    }
}