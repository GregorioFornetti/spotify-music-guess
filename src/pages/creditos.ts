import { getUser } from "../gitAPI/authCode"
import toggleToPage from '../utils/pageToggler'

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("credit")?.addEventListener("click", () => {
        toggleToPage('credits-page')
        const username = getUser()
        console.log("username: " + username)
        }
    )   
})


