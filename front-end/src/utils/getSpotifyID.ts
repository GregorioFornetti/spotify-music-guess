import addLoading from "./addLoading"
import { root } from "../spotifyApi/configs"

const idRegexAnyPlace = "([A-Za-z0-9]{22})"
const idRegex = new RegExp(`^${idRegexAnyPlace}$`)

const uriPlaylistRegex = new RegExp(`^spotify:playlist:${idRegexAnyPlace}$`)

const urlPlaylistAnyPlace = new RegExp(`https:\/\/open.spotify.com\/playlist\/${idRegexAnyPlace}(\\?si=.*)?`)
const urlPlaylistRegex = new RegExp(`^${urlPlaylistAnyPlace.source}$`)

const urlSpotifyLinkRegex = new RegExp(`^https://spotify\.(app\.)?link/[A-Za-z0-9]{11}$`)

/**
 * 
 *  Verifica se uma string é um id válido do spotify. Isso não quer dizer que o id é verdadeiro, e que realmente retornará algo em alguma requisição da API. Essa função apenas verifica se a string recebida segue o padrão de um id, como definido na [documentação](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
 * 
 *  @param {string} idString - texto(string) que será analisada
 * 
 *  @returns retorna True caso o parâmetro seja um id válido para um id Spotify. Caso contrário, retorna False
 * 
 */
function isSpotifyId(idString: string): boolean {
    return idRegex.test(idString)
}


/**
 * 
 *  Verifica se uma string é um URI válido do spotify de uma playlist. Isso não quer dizer que é verdadeiro, e que realmente retornará algo em alguma requisição da API. Essa função apenas verifica se a string recebida segue o padrão, como definido na [documentação](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
 * 
 *  @param {string} uriString - texto(string) que será analisada
 * 
 *  @returns retorna True caso o parâmetro seja válido para um URI de playlist do Spotify. Caso contrário, retorna False
 * 
 */
function isSpotifyPlaylistUri(uriString: string): boolean {
    return uriPlaylistRegex.test(uriString)
}

/**
 * 
 *  Verifica se uma string é um URL válido do spotify de uma playlist. Isso não quer dizer que é verdadeiro, e que realmente retornará algo em alguma requisição da API. Essa função apenas verifica se a string recebida segue o padrão, como definido na [documentação](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
 * 
 *  @param {string} urlString - texto(string) que será analisada
 * 
 *  @returns retorna True caso o parâmetro seja válido para um URL de playlist do Spotify. Caso contrário, retorna False
 * 
 */
function isSpotifyPlaylistUrl(urlString: string): boolean {
    return urlPlaylistRegex.test(urlString)
}

function isSpotifyLinkUrl(urlString: string): boolean {
    return urlSpotifyLinkRegex.test(urlString)
}

/**
 * 
 *  Coleta o Spotify ID contido na URI da playlist
 * 
 *  @param {string} uri - string com a URI de uma playlist do spotify
 * 
 *  @returns retorna o spotify ID contido na URI da playlist. O ID é necessário para fazer algumas requisições.
 * 
 */
function getSpotifyIdFromPlaylistUri(uri: string): string {
    return uri.match(uriPlaylistRegex)![1]
}

/**
 * 
 *  Coleta o Spotify ID contido na URL da playlist
 * 
 *  @param {string} url - string com a URL de uma playlist do spotify
 * 
 *  @returns retorna o spotify ID contido na URL da playlist. O ID é necessário para fazer algumas requisições.
 * 
 */
function getSpotifyIdFromPlaylistUrl(url: string): string {
    return url.match(urlPlaylistRegex)![1]
}

async function getSpotifyIdFromSpotifyLinkUrl(url: string): Promise<string> {
    const finalUrl = `https://spotify.app.link/${url.split('/')[3]}`
    const response = await fetch(`${root}/get-redirect-response?url=${finalUrl}`, {method: 'GET'})
    const text = await response.text()
    const playlistUrl =  text.match(urlPlaylistAnyPlace)![0]
    return getSpotifyIdFromPlaylistUrl(playlistUrl)
}


/**
 * 
 *  Coleta o spotify ID de um ID, URL ou URI de playlist. OBS: só funciona para playlists, no futuro pode ser que funcione para outros objetos (como albuns ou artistas). Provavelmente, caso tenha esse suporte, o retorno terá que ser modificado para incluir o tipo de ID que é (de um album, artista ou playlist).
 * 
 *  @param userInput - texto (string) possivelmente contendo informação necessária para coletar um Spotify ID
 * 
 *  @returns spotify ID, caso seja um ID, URL ou URI válido. Caso contrário, lança um erro
 * 
 */
export default function getSpotifyId(userInput: string): Promise<string> {
    userInput = userInput.trim()
    
    if (isSpotifyPlaylistUri(userInput)) {
        return Promise.resolve(getSpotifyIdFromPlaylistUri(userInput))
    } else if (isSpotifyPlaylistUrl(userInput)) {
        return Promise.resolve(getSpotifyIdFromPlaylistUrl(userInput))
    } else if (isSpotifyLinkUrl(userInput)) {
        return addLoading(getSpotifyIdFromSpotifyLinkUrl, userInput)
    } else if (isSpotifyId(userInput)) {
        // Talves só pelo ID não dê certo no futuro, já que é necessário identificar do que é o id (playlist, album, etc)
        return Promise.resolve(userInput)
    } else {
        throw new Error("URI, URL ou ID inválido.")
    }
}