import User from "../../global/User"
import { addLoadingWithConditional } from "../../utils/addLoading"
import Playlist, { PlaylistTrackObject } from "../types/Playlist"
import ExtendedPlaylist from "../types/ExtendedPlaylist"

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


async function makeGetPlaylistRequest(playlistId: String): Promise<ExtendedPlaylist> { 
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}?market=${User.country}&additional_types=episode`, {
        method: "GET",
        headers: User.accessTokenHeader
    })
    .then(response => response.json())
    .then(async (data:Playlist) => {
        const finalPlaylist: ExtendedPlaylist = {...data, playableIndexes: []}
        let next = data.tracks.next
        let curMusicIndex = 0
        const finalItems: PlaylistTrackObject[] = []
        const finalIndexes: number[] = []
        const populateItemsAndIndex = (currentMusic: PlaylistTrackObject) => {
            if (isPlayable(currentMusic)) {
                finalIndexes.push(curMusicIndex)
            }
            finalItems.push(currentMusic)
            curMusicIndex++
        }

        data.tracks.items.forEach(populateItemsAndIndex)

        // Para coletar todas as musicas, pois a API só retorna 100 por vez, por padrão
        while (next) {
            await fetch(next, {
                method: "GET",
                headers: User.accessTokenHeader
            })
            .then(response => response.json())
            .then(next_data => {
                next_data.items.forEach(populateItemsAndIndex)
                next = next_data.next
            })
        }

        finalPlaylist.tracks.items = finalItems
        finalPlaylist.playableIndexes = finalIndexes
        
        return finalPlaylist
    })
}

/**
 * 
 *  Coleta informações de uma playlist, como as músicas/episódios contidos nela, capa, nome, etc. Isso é feito através de uma requisição à API do spotify
 * 
 *  @param playlistId - ID da playlist, que será buscada as informações
 * 
 *  @param hasLoading - Adiciona no documento um modal de carregamento. O modal é fechado quando a solicitação é finalizada
 * 
 *  @returns uma promessa de retorno de um objeto contendo informações sobre uma playlist.
 * 
 */
export default async function getPlaylist(playlistId: String, hasLoading?: boolean): Promise<ExtendedPlaylist> {
    return addLoadingWithConditional(makeGetPlaylistRequest, hasLoading, playlistId)
}