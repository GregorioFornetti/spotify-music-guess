
import get_spotify_id from "../getSpotifyID"
import AccessToken from "../AccessToken"
import showPlaylistInfo from "./playlistInfo"

async function get_playlist_info(playlist_id: String, accessToken: any): Promise<any> {
    return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    .then(response => response.json())
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("playlist-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const playlist_input_str = (<HTMLInputElement>document.getElementById("playlist-input")).value;
        try {
            const playlist_id = get_spotify_id(playlist_input_str)
            const playlist = await get_playlist_info(playlist_id, AccessToken.accessToken);
            showPlaylistInfo(playlist)
        } catch (error) {
            console.log(error)
        }
    })
})