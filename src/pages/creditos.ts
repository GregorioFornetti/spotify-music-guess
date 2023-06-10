// octokit.ts import 
import { getUser } from "../gitAPI/octokit"
import toggleToPage from '../utils/pageToggler'

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("credit")?.addEventListener("click", () => {
        toggleToPage('credits-page')
        }
    )   
})

async function printUserName() {
  const userName = await getUser();
  if (userName) {
    console.log(userName);
  } else {
    console.log("Erro ao obter o nome do usuário.");
  }
}

//printUserName();


