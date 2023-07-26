
import toggleToPage from "./utils/pageToggler"
import User from "./global/User"
import loadHomePage from "./pages/home"

const params = new URLSearchParams(window.location.search)
const logged = params.get("login") === 'true'
const acessToken = params.get("acessToken") as string
const country = params.get("country") as string

document.addEventListener('DOMContentLoaded', async () => {
    toggleToPage('empty-page')

    User.accessToken = acessToken
    User.country = country
    User.isLogged = logged

    await loadHomePage()
    //toggleToPage('test-page')
})