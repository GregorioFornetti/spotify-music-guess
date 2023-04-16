
import get_spotify_id from "../utils/getSpotifyID"
import User from "../global/User"
import showPlaylistInfo from "./playlistInfo"

const filterPlayableTracks = (track: any) => {
    if (!track.track) {
        return false
    }
    return track.track.is_playable
}

async function get_playlist_info(playlistId: String): Promise<any> { 
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}?market=${User.country}&additional_types=episode`, {
        method: "GET",
        headers: User.accessTokenHeader
    })
    .then(response => response.json())
    .then(async data => {
        console.log(data)
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


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("playlist-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const playlist_input_str = (<HTMLInputElement>document.getElementById("playlist-input")).value;
        try {
            const playlistId = get_spotify_id(playlist_input_str)
            const playlist = await get_playlist_info(playlistId)
            showPlaylistInfo(playlist, playlistId)
        } catch (error) {
            console.log(error)
        }
    })


})