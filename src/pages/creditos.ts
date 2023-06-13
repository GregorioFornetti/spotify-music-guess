import { getInfo } from "../gitAPI/authCode"
import toggleToPage from '../utils/pageToggler'

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("credit")?.addEventListener("click", () => {
        toggleToPage('credits-page')
        clearDiv();

        const users = [ 'A-nita', 'caiopadovan', 'Pandxra', 'GregorioFornetti', 'guilhermesdc', 'N4NiNi'] 
        const creditsElement = document.getElementById('credits-page')!;
        
        for (let user of users) {
            const userDataPromise = getInfo(user);
            userDataPromise.then(userData => {
                const name = userData.name;
                const avatar = userData.avatar_url;
                const bio = userData.bio;

                const divElement = document.createElement('div');
                divElement.appendChild(addText('name', name));
                divElement.appendChild(addImage('avatar', avatar));
                divElement.appendChild(addText('bio', bio));

                divElement.classList.add('div-user');
                creditsElement.appendChild(divElement);
            });
        }
    })   
})

function clearDiv() {    
    const creditsElement = document.getElementById('credits-page')!;
    creditsElement.innerHTML = '';   
}

function addText(text: string, creditsElement: string) {
    const paragraphElement = document.createElement('p');
    paragraphElement.classList.add(text);
    paragraphElement.textContent = creditsElement;
    return paragraphElement;
}

function addImage(image: string, creditsElement: string) {
    const imageElement = document.createElement('img');
    imageElement.classList.add(image);
    imageElement.setAttribute('src', creditsElement);
    return imageElement;
}
