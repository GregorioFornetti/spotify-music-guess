import User from "../../global/User"
import { addLoadingWithConditional } from "../../utils/addLoading"
import SimplifiedPlaylist from "../types/SimplifiedPlaylist"


async function makeGetSimplifiedPlaylistRequest(playlistId: string): Promise<SimplifiedPlaylist> {
    const fields = [
        "collaborative",
        "description",
        "external_urls",
        "href",
        "id",
        "images",
        "name",
        "owner",
        "public",
        "snapshot_id",
        "tracks(href,total)",
        "type",
        "uri"
    ]
    const fieldsString = fields.join(",")

    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}?fields=${fieldsString}`, {
        method: "GET",
        headers: User.accessTokenHeader
    }).then(res => res.json())
}

/**
 *  Retorna uma playlist simplificada (sem informações das músicas)
 *  
 *  @param playlistId - Id da playlist que será retornada
 * 
 *  @param hasLoading - Adiciona no documento um modal de carregamento. O modal é fechado quando a solicitação é finalizada
 * 
 *  @returns Uma playlist simplificada (sem informações das músicas)
 * 
 */
export default async function getSimplifiedPlaylist(playlistId: string, hasLoading?: boolean): Promise<SimplifiedPlaylist> {
    return addLoadingWithConditional(makeGetSimplifiedPlaylistRequest, hasLoading, playlistId)
}