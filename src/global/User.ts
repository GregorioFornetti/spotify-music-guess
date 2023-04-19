
/**
 *  Uma classe contendo informações do usuário atual que está utilizando a aplicação. 
 *  Como as informações do usuário são necessárias para fazer requisições da API, é interessante
 *  essas informações serem globais.
 */
export default class User {

    private static _accessToken: string = ""
    private static _country: string = ""

    /**
     *  Valor necessário para fazer as requisições da API
     */
    static get accessToken() {
        return this._accessToken;
    }

    /**
     *  Retorna o header necessário para as requisições do SpotifyAPI, contendo o acess token.
     */
    static get accessTokenHeader() {
        return {
            Authorization: `Bearer ${this._accessToken}`,
        }
    }

    static set accessToken(accessToken: string) {
        this._accessToken = accessToken;
    }

    /**
     *  País do usuário atual, do spotify. Necessário para algumas requisições.
     *  Por exemplo, para identificar e filtrar músicas indisponíveis, é necessário essa informação
     */
    static get country() {
        return this._country;
    }

    static set country(country: string) {
        this._country = country;
    }
}
