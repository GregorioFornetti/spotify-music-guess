import User from "../../global/User"
import Playlist from "../types/Playlist"


function filterPlayableTracks(track: any) {
    if (!track.track) {
        return false
    }
    return track.track.is_playable
}

export default async function get_playlist_info(playlistId: String): Promise<Playlist> { 
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}?market=${User.country}&additional_types=episode`, {
        method: "GET",
        headers: User.accessTokenHeader
    })
    .then(response => response.json())
    .then(async (data:Playlist) => {
        var next = data.tracks.next
        data.tracks.items = data.tracks.items.filter(filterPlayableTracks)

        // Para coletar todas as musicas, pois a API só retorna 100 por vez, por padrão
        while (next) {
            await fetch(next, {
                method: "GET",
                headers: User.accessTokenHeader
            })
            .then(response => response.json())
            .then(next_data => {
                data.tracks.items.push(...next_data.items.filter(filterPlayableTracks))
                next = next_data.next
            })
        }

        return data
    })
}