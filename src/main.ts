
import { redirectToAuthCodeFlow, getAccessToken } from "./spotifyApi/authCodeWithPkce"
import toggleToPage from "./utils/pageToggler"
import User from "./global/User"
import getUserCountry from "./spotifyApi/requests/getUserCountry"
import loadHomePage from "./pages/home"


const clientId = "b3c2339a149d46afa94a39347466b623";
const params = new URLSearchParams(window.location.search)
const code = params.get("code")

document.addEventListener('DOMContentLoaded', async () => {
    toggleToPage('')
    if (!code) {
        redirectToAuthCodeFlow(clientId)
    } else {
        User.accessToken = await getAccessToken(clientId, code)
        User.country = await getUserCountry()

        await loadHomePage()

        toggleToPage('home-page')
    }
})