// Because this is a literal single page application
// we detect a callback from Spotify by checking for the hash fragment
import { redirectToAuthCodeFlow, getAccessToken } from "./authCodeWithPkce";
import get_spotify_id from "./getSpotifyID";

/*
async function start_playing_playlist(playlist_URI: String, accessToken: any) {
    const test = await fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            "context_uri": playlist_URI,
            //"offset": {
            //    "position": 5
            //},
            "position_ms": 0
        })
    })
    return test
}
*/

async function get_playlist_info(playlist_id: String, accessToken: any) {
    const test = fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    .then(response => response.json())

    return test
}


const clientId = "b3c2339a149d46afa94a39347466b623";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code)
    document.getElementById("playlist-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const playlist_input_str = (<HTMLInputElement>document.getElementById("playlist-input")).value;
        try {
            const playlist_id = get_spotify_id(playlist_input_str)
            const result = await get_playlist_info(playlist_id, accessToken);
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    })
}
