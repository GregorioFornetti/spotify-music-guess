
import { redirectToAuthCodeFlow, getAccessToken } from "./spotifyApi/authCodeWithPkce"
import getUserCountry from "./spotifyApi/requests/getUserCountry"
import clientId from "./spotifyApi/clientId"
import User from "./global/User"
import { redirectUri } from "./spotifyApi/configs"

const params = new URLSearchParams(window.location.search)
const code = params.get("code")

document.addEventListener('DOMContentLoaded', async () => {

    if (code) {
        try {
            const accessToken = await getAccessToken(clientId, code)
            User.accessToken = accessToken
            const country = await getUserCountry()

            params.delete('code')
            params.append("login", "true")
            params.append("acessToken", accessToken)
            params.append("country", country)

            document.location = `${redirectUri}/home.html?${params.toString()}`
        }
        catch (error) {
            console.log('Não foi possível carregar o home page', error)
        }
    } else {
        redirectToAuthCodeFlow(clientId)
    }
})