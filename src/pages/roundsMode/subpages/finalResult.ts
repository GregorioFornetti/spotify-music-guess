/*
    Página do resultado final, após o usuário jogar todas rodadas
*/
import toggleToPage, { toggleToSubpage } from "../../../utils/pageToggler"
import GameInfo from "../GameInfo"


export default function showFinalResultPage() {

    document.getElementById('final-result-correct-count')!.innerText = GameInfo.correctAnswersCount.toString()

    document.getElementById("final-result-total-rounds")!.innerText = GameInfo.totalRounds.toString()

    toggleToSubpage(GameInfo.pageId, 'final-result-rounds-subpage')
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("final-result-return")?.addEventListener("click", () => {
        toggleToPage('home-page')
    })
})