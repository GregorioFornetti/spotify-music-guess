/*
    Página do resultado final, após o usuário jogar todas rodadas
*/
import createRoundHistoryElement from "../../../components/roundHistory"
import formatTime from "../../../utils/formatTime"
import toggleToPage from "../../../utils/pageToggler"
import GameInfo from "../GameInfo"
import toggleToSubpage from "../subpageToggler"
import initConfigSubpage from "./configs"
import { initShowSongGuess } from "./songGuess"


export default function showFinalResultPage() {

    document.getElementById('rounds-mode-score')!.innerText = GameInfo.score.toString()

    document.getElementById('rounds-mode-correct-count')!.innerText = GameInfo.correctAnswersCount.toString()

    document.getElementById('rounds-mode-incorrect-count')!.innerText = GameInfo.incorrectAnswerCount.toString()

    document.getElementById("rounds-mode-total-rounds")!.innerText = GameInfo.totalRounds.toString()

    document.getElementById('rounds-mode-total-time')!.innerText = formatTime(GameInfo.currentTime)

    document.getElementById('rounds-mode-extra-tries-count')!.innerText = GameInfo.extraTriesCount.toString()

    if (GameInfo.extraTries) {
        document.getElementById('rounds-mode-extra-tries')!.style.display = 'block'
    } else {
        document.getElementById('rounds-mode-extra-tries')!.style.display = 'none'
    }

    const roundsHistoryContainer = document.getElementById('carousel-inner') as HTMLElement
    roundsHistoryContainer.innerHTML = ''

    // const roundTest
    
    const nslidesContainer = document.getElementById('nslides') as HTMLElement
    nslidesContainer.innerHTML = ''
    var i = 0;

    
    for (let roundInfo of GameInfo.roundsHistory) {
        //criar button dentro de nslides
        const button = document.createElement('button');
        const elementRound = createRoundHistoryElement(roundInfo)

        nslidesContainer.appendChild(button);
        button.dataset.bsTarget = '#carouselExampleCaptions';
        button.dataset.bsSlideTo = i.toString();
        if(i == 0){
            button.classList.add('active');
            button.setAttribute('aria-current', 'true');
            elementRound.classList.add('active');
        }

        button.setAttribute('aria-label', `Slide ${i+1}`);
        roundsHistoryContainer.appendChild(elementRound)

        i++;
    }
    

    toggleToSubpage('final-result-rounds-subpage')
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("final-result-return")?.addEventListener("click", () => {
        toggleToPage('home-page')
    })

    document.getElementById('play-again-rounds-mode-new-configs')?.addEventListener('click', () => {
        GameInfo.reset()

        initConfigSubpage()
    })

    document.getElementById("play-again-rounds-mode-same-configs")?.addEventListener('click', () => {
        GameInfo.reset()

        initShowSongGuess()
    })
})