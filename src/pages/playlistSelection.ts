
import get_spotify_id from "../getSpotifyID"
import AccessToken from "../AccessToken"
import showPlaylistInfo from "./playlistInfo"

async function get_playlist_info(playlistId: String): Promise<any> { 
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        method: "GET",
        headers: AccessToken.accessTokenHeader
    })
    .then(response => response.json())
    .then(async data => {
        var next = data.tracks.next

        // Para coletar todas as musicas, pois a API só retorna 100 por vez, por padrão
        while (next) {
            await fetch(next, {
                method: "GET",
                headers: AccessToken.accessTokenHeader
            })
            .then(response => response.json())
            .then(next_data => {
                data.tracks.items.push(...next_data.items)
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