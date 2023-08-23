/*
    Página de termino de uma rodada, após usuário responder qual música achava que era a correta.
*/
import toggleToSubpage from "../subpageToggler"
import createMusicElement from "../../../components/music"
import showSongGuess from "./songGuess"
import Track from "../../../spotifyApi/types/Track"
import Episode from "../../../spotifyApi/types/Episode"
import GameInfo from "../GameInfo"
import showFinalResultPage from "./finalResult"


export default function showSongResult(correctMusic: Track|Episode, guessedMusic: Track|Episode) {
    
    GameInfo.addRoundHistory(correctMusic, guessedMusic)

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
    const musicElemento = createMusicElement(correctMusic)
    musicElemento.getElementsByClassName("music-image")[0].classList.add("img-fluid")
    musicElemento.getElementsByClassName("music-image")[0].classList.add("music-image-round-history")
    musicElemento.getElementsByClassName("music-name")[0].classList.add("music-name-round-history")
    musicElemento.getElementsByClassName("music-artist")[0].classList.add("music-artist-round-history")
    correctMusicElement.appendChild(musicElemento)
    

    const guessedMusicElement = document.getElementById("song-result-guessed-song") as HTMLElement
    guessedMusicElement.innerHTML = ""
    const musicElementog = createMusicElement(guessedMusic)
    musicElementog.getElementsByClassName("music-image")[0].classList.add("img-fluid")
    musicElementog.getElementsByClassName("music-image")[0].classList.add("music-image-round-history")
    musicElementog.getElementsByClassName("music-name")[0].classList.add("music-name-round-history")
    musicElementog.getElementsByClassName("music-artist")[0].classList.add("music-artist-round-history")
    guessedMusicElement.appendChild(musicElementog)

    
    toggleToSubpage('song-result-rounds-subpage')
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