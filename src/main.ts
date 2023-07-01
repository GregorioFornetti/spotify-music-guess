
import { redirectToAuthCodeFlow, getAccessToken } from "./spotifyApi/authCodeWithPkce"
import toggleToPage from "./utils/pageToggler"
import User from "./global/User"
import getUserCountry from "./spotifyApi/requests/getUserCountry"
import loadHomePage from "./pages/home"
import createPlaylistElement from "./components/playlist"
import getPlaylist from "./spotifyApi/requests/getPlaylist"
import Episode from "./spotifyApi/types/Episode"
import Track from "./spotifyApi/types/Track"

const clientId = "b3c2339a149d46afa94a39347466b623";
const params = new URLSearchParams(window.location.search)
const code = params.get("code")

document.addEventListener('DOMContentLoaded', async () => {
    toggleToPage('empty-page')
    if (!code) {
        redirectToAuthCodeFlow(clientId)
    } else {
        try {
            User.accessToken = await getAccessToken(clientId, code)
            User.country = await getUserCountry()
    
            await loadHomePage()
        } catch (error) {
            console.log('Não foi possível carregar o home page', error)
        }
        // toggleToPage('home-page')
        toggleToPage('tests-page')

        // Sem a função opcional
        const testsContainer = document.getElementById('tests-page')
        const playlist = await getPlaylist('0BjRyg8AxIdh1DMtVE7t6f?si=b78d225f3b1c47a0')
        const playlistElement = createPlaylistElement(playlist)
        testsContainer?.appendChild(playlistElement)

        /*
        // Com função opcional
        const funcOpcional =  (music: Track|Episode) => {
            console.log(music)
        }
        const playlistElement2 = createPlaylistElement(playlistElement, funcOpcional)
        testsContainer?.appendChild(playlistElement2)
        */
    }
})