import User from "../../global/User"
import SimplifiedPlaylist from "../types/SimplifiedPlaylist"

/**
 *  
 *  Retorna uma playlist simplificada (sem informações das músicas)
 *  
 *  @param playlistId - Id da playlist que será retornada
 * 
 *  @returns Uma playlist simplificada (sem informações das músicas)
 *  
 */
export default async function getSimplifiedPlaylist(playlistId: string): Promise<SimplifiedPlaylist> {
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