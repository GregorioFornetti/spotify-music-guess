
import get_spotify_id from "../getSpotifyID"
import AccessToken from "../AccessToken"
import showPlaylistInfo from "./playlistInfo"

async function get_playlist_info(playlist_id: String): Promise<any> { 
    return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${AccessToken.accessToken}`
        }
    })
    .then(response => response.json())
    .then(async data => {
        var next = data.tracks.next

        while (next) {
            await fetch(next, {
                method: "GET",
                headers: AccessToken.accessTokenHeader
            })
            .then(response => response.json())
            .then(next_data => {
                console.log(next_data)
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
            const playlist_id = get_spotify_id(playlist_input_str)
            const playlist = await get_playlist_info(playlist_id);
            showPlaylistInfo(playlist)
        } catch (error) {
            console.log(error)
        }
    })
})