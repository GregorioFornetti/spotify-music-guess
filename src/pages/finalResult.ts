
import toggleToPage from "./pageToggler"


export default function showFinalResultPage(correctAnswerCount: number, totalRounds: number) {

    document.getElementById('final-result-correct-count')!.innerText = correctAnswerCount.toString()

    document.getElementById("final-result-total-rounds")!.innerText = totalRounds.toString()

    toggleToPage('final-result-page')
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("final-result-return")?.addEventListener("click", () => {
        toggleToPage('playlist-selection-page')
    })
})