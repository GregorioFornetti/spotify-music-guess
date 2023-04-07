// Because this is a literal single page application
// we detect a callback from Spotify by checking for the hash fragment
import { redirectToAuthCodeFlow, getAccessToken } from "./authCodeWithPkce";
import toggleToPage from "./pages/pageToggler";
import AccessToken from "./AccessToken";

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

const clientId = "b3c2339a149d46afa94a39347466b623";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

document.addEventListener('DOMContentLoaded', async () => {
    toggleToPage('')
    if (!code) {
        redirectToAuthCodeFlow(clientId);
    } else {
        AccessToken.accessToken = await getAccessToken(clientId, code)
        toggleToPage('playlist-selection-page')
    }
})