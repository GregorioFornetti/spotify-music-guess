
import { redirectUri } from "./spotifyApi/configs"

const params = new URLSearchParams(window.location.search)

document.addEventListener('DOMContentLoaded', async () => {

    const loginBtn = document.getElementById('login')
    loginBtn?.addEventListener('click', () => {
        document.location = `${redirectUri}?${params.toString()}`
    })

    const noLoginBtn = document.getElementById('no-login')
    noLoginBtn?.addEventListener('click', async () => {
        const token = await fetch('/auth-without-login').then((res) => (res.text()))

        params.append("login", "false")
        params.append("acessToken", token)
        params.append("country", "br")

        document.location = `home.html?${params.toString()}`
    })
})