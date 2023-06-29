import { getInfo } from "../gitAPI/authCode"
import toggleToPage from '../utils/pageToggler'

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("credit")?.addEventListener("click", () => {
        toggleToPage('credits-page')
        clearDiv();
        

        const users = [ 'A-nita', 'caiopadovan', 'Pandxra', 'GregorioFornetti', 'guilhermesdc', 'N4NiNi'];
        const cargos = ['Desenvolvedora', 'Desenvolvedor', 'Desenvolvedora', 'Desenvolvedor', 'Desenvolvedor', 'Desenvolvedor'];
        const link_lid = ['https://www.linkedin.com/in/anita-moura/', 'https://www.linkedin.com/in/caio-padovan-b28a97262/', 
        'https://www.linkedin.com/in/cinthiacosta98/]','https://www.linkedin.com/in/greg%C3%B3rio-fornetti-azevedo-4a0193201/', 
        'https://www.linkedin.com/in/guilherme-silva-de-camargo-104618220/', 'https://www.linkedin.com/in/vinicius-nanini/'];
        const creditsElement = document.getElementById('credits_cards')!;
        
        for (let user of users) {
            const userDataPromise = getInfo(user);
            userDataPromise.then(userData => {
                //pegar dados do usuário
                const name = userData.name;
                const avatar = userData.avatar_url;
                const url_user = userData.html_url;
                const url_lid = link_lid[users.indexOf(user)];
                const cargo = cargos[users.indexOf(user)];


                //criar elementos HTML
                //DIVS
                const colElement = document.createElement('div');
                const divElement = document.createElement('div');
                const diviconsElement = document.createElement('div');
                const cardBody = document.createElement('div');
                //h5, p, img, a
                const cardTitle = document.createElement('h5');
                const cardText = document.createElement('p');
                const cardimg = document.createElement('img');
                const giticon = document.createElement('i');
                const ldinicon = document.createElement('i');
                const giticonLink = document.createElement('a');
                const ldiniconLink = document.createElement('a');

                //inserir link do github
                giticonLink.href = url_user;
                ldiniconLink.href = url_lid;
                
                //p
                diviconsElement.className='position-relative';

                //definindo estilos
                colElement.className = 'col-12 col-sm-6 col-md-4 d-flex align-items-stretch';

                divElement.className = 'zoomeffect cardborder mb-5 card';
                divElement.style.width = '18rem';


                cardBody.className = 'zoomeffect text-white cardcolor card-body d-flex align-items-start flex-column';

                cardTitle.className = 'cardnome h5 card-title mb-auto';

                cardText.className = 'cardcargo card-text my-3';

                cardimg.className = 'p-2 card-img-top';
                cardimg.setAttribute('src', avatar);

                giticon.className = 'social_icon bi bi-github fs-2 p-2';
                ldinicon.className = 'social_icon bi bi-linkedin fs-2 p-2';

                cardTitle.textContent = name;
                cardText.textContent = cargo;

                //indentação
                colElement.appendChild(divElement); 

                divElement.appendChild(cardimg);
                divElement.appendChild(cardBody);

                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
                cardBody.appendChild(diviconsElement);

                ldiniconLink.appendChild(ldinicon);
                diviconsElement.appendChild(ldiniconLink);

                giticonLink.appendChild(giticon);

                diviconsElement.appendChild(giticonLink);

                creditsElement.appendChild(colElement);
            });
        }
    })   
})

function clearDiv() {    
    const creditsElement = document.getElementById('credits_cards')!;
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
