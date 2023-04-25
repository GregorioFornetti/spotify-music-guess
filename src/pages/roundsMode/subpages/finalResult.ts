/*
    Página do resultado final, após o usuário jogar todas rodadas
*/
import toggleToPage from "../../../utils/pageToggler"
import GameInfo from "../GameInfo"
import toggleToSubpage from "../subpageToggler"


export default function showFinalResultPage() {

    document.getElementById('final-result-correct-count')!.innerText = GameInfo.correctAnswersCount.toString()

    document.getElementById("final-result-total-rounds")!.innerText = GameInfo.totalRounds.toString()

    toggleToSubpage('final-result-rounds-subpage')
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("final-result-return")?.addEventListener("click", () => {
        toggleToPage('home-page')
    })
})