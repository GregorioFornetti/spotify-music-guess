import { getInfo } from "../gitAPI/authCode"
import toggleToPage from '../utils/pageToggler'

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("credit")?.addEventListener("click", () => {
        toggleToPage('credits-page')
        //const data = getInfo('guilhermesdc')
        // pegar o nome do usuário da variavel data
        // lista de nomes
        const users = ['guilhermesdc', 'N4NiNi', 'caiopadovan', 'GregorioFornetti', 'A-nita'] 
        const creditsElement = document.getElementById('credits-page')!;
        for (let user of users) {
            const userDataPromise = getInfo(user);
            userDataPromise.then(userData => {
                const name = userData.name;
                const avatar = userData.avatar_url;

                const paragraphElement = document.createElement('p');
                const avatarElement = document.createElement('img');
                
                avatarElement.classList.add('avatar');
                paragraphElement.classList.add('gitName');

                avatarElement.setAttribute('src', avatar);
                paragraphElement.textContent = name;

                const divElement = document.createElement('div');
                divElement.appendChild(paragraphElement);
                divElement.appendChild(avatarElement);

                divElement.classList.add('div-user');
                creditsElement.appendChild(divElement);
            });
        }
    })   
})
