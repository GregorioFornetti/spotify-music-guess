
import { toggleToSubpage } from "../../../utils/pageToggler"
import createMusicElement from "../../../components/music"
import showSongGuess from "./songGuess"
import Track from "../../../spotifyApi/types/Track"
import Episode from "../../../spotifyApi/types/Episode"
import GameInfo from "../GameInfo"
import showFinalResultPage from "./finalResult"


export default function showSongResult(correctMusic: Track|Episode, guessedMusic: Track|Episode) {
    if (correctMusic.id === guessedMusic.id) {
        document.getElementById('song-result-message')!.innerText = 'Você acertou !'
        GameInfo.increaseCorrectAnswerCount()
    } else {
        document.getElementById('song-result-message')!.innerText = 'Você errou !'
    }

    document.getElementById("song-result-current-round")!.innerText = GameInfo.roundNumber.toString()

    document.getElementById("song-result-total-rounds")!.innerText = GameInfo.totalRounds.toString()

    const correctMusicElement = document.getElementById("song-result-correct-song") as HTMLElement
    correctMusicElement.innerHTML = ""
    correctMusicElement.appendChild(createMusicElement(correctMusic))

    const guessedMusicElement = document.getElementById("song-result-guessed-song") as HTMLElement
    guessedMusicElement.innerHTML = ""
    guessedMusicElement.appendChild(createMusicElement(guessedMusic))

    
    toggleToSubpage(GameInfo.pageId, 'song-result-rounds-subpage')
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("song-result-next")?.addEventListener("click", () => {
        if (GameInfo.roundNumber === GameInfo.totalRounds) {
            showFinalResultPage()
        } else {
            GameInfo.increaseRoundNumber()
            showSongGuess()
        }
    })
})