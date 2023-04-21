
import User from "../../global/User"

/**
 * 
 *  Coleta o país em que o usuário está cadastrado no Spotify. Essa informação é importante para
 *  requisições que precisam verificar restrições. Por exemplo, em uma playlist, podem existir
 *  músicas indisponíveis, pois no país de origem do usuário a música não está disponível
 * 
 *  @returns uma promessa de uma string contendo o [código do país do usuário](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
 * 
 */
export default async function getUserCountry(): Promise<string> {
    const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: User.accessTokenHeader
    }).then(response => response.json())

    return response.country
}