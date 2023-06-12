import toggleToPage from '../utils/pageToggler'
import {getUser} from '../gitAPI/authCode'

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("credit")?.addEventListener("click", () => {
        toggleToPage('credits-page')
        // informacoes do usuario
        const user = getUser()
        console.log(user)
        }
    )   
})


