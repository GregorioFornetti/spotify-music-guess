import User from "../../global/User"
import Playlist, { PlaylistTrackObject } from "../types/Playlist"

/**
 *  
 *  Verifica se uma música/episódio é ouvivel ou não. Pode ser que a música/episódio não esteja disponível no país em que o usuário está, e não pode ser ouvida pelo mesmo, sendo necessário remover da playlist do jogo.
 * 
 *  @param {PlaylistTrackObject} track - objeto contendo informações sobre a música/episódio da playlist.
 * 
 *  @returns True caso seja ouvível, False caso contrário
 * 
 */
function isPlayable(playlistTrack: PlaylistTrackObject) {
    if (!playlistTrack.track) {
        return false
    }
    return playlistTrack.track.is_playable
}

/**
 * 
 *  Coleta informações de uma playlist, como as músicas/episódios contidos nela, capa, nome, etc. Isso é feito através de uma requisição à API do spotify
 * 
 *  @param playlistId - ID da playlist, que será buscada as informações
 * 
 *  @returns uma promessa de retorno de um objeto contendo informações sobre uma playlist.
 * 
 */
export default async function getPlaylist(playlistId: String): Promise<Playlist> { 
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}?market=${User.country}&additional_types=episode`, {
        method: "GET",
        headers: User.accessTokenHeader
    })
    .then(response => response.json())
    .then(async (data:Playlist) => {
        var next = data.tracks.next
        data.tracks.items = data.tracks.items.filter(isPlayable)

        // Para coletar todas as musicas, pois a API só retorna 100 por vez, por padrão
        while (next) {
            await fetch(next, {
                method: "GET",
                headers: User.accessTokenHeader
            })
            .then(response => response.json())
            .then(next_data => {
                data.tracks.items.push(...next_data.items.filter(isPlayable))
                next = next_data.next
            })
        }

        return data
    })
}