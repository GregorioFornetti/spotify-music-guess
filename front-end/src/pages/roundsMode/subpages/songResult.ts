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
        document.getElementById('song-result-message')!.classList.add('music-round-subpage-choice-ac')
        document.getElementById('song-result-message')!.classList.remove('music-round-subpage-choice-re')
        document.getElementById('music-title-resposta')!.classList.add('music-round-subpage-choice-ac')
        document.getElementById('music-title-resposta')!.classList.remove('music-round-subpage-choice-re')
        GameInfo.increaseCorrectAnswerCount()
    } else {
        document.getElementById('song-result-message')!.innerText = 'Você errou !'
        document.getElementById('song-result-message')!.classList.add('music-round-subpage-choice-re')
        document.getElementById('song-result-message')!.classList.remove('music-round-subpage-choice-ac')
        document.getElementById('music-title-resposta')!.classList.add('music-round-subpage-choice-re')
        document.getElementById('music-title-resposta')!.classList.remove('music-round-subpage-choice-ac')
    }

    document.getElementById("song-result-current-round")!.innerText = GameInfo.roundNumber.toString()

    document.getElementById("song-result-total-rounds")!.innerText = GameInfo.totalRounds.toString()

    const correctMusicElement = document.getElementById("song-result-correct-song") as HTMLElement
    correctMusicElement.innerHTML = ""
    const musicElementCorrect = createMusicElement(correctMusic)
    musicElementCorrect.getElementsByClassName("music-image")[0].classList.add("img-fluid")
    musicElementCorrect.getElementsByClassName("music-image")[0].classList.add("music-image-subresult")
    musicElementCorrect.getElementsByClassName("music-name")[0].classList.add("music-name-subresult")
    musicElementCorrect.getElementsByClassName("music-artist")[0].classList.add("music-artist-subresult")
    musicElementCorrect.getElementsByClassName("music-image")[0].classList.add("music-round-subpage")
    musicElementCorrect.getElementsByClassName("music-name")[0].classList.add("music-round-subpage")
    musicElementCorrect.getElementsByClassName("music-artist")[0].classList.add("music-round-subpage")
    correctMusicElement.appendChild(musicElementCorrect)
    

    const guessedMusicElement = document.getElementById("song-result-guessed-song") as HTMLElement
    guessedMusicElement.innerHTML = ""
    const musicElementGuessed = createMusicElement(guessedMusic)
    musicElementGuessed.getElementsByClassName("music-image")[0].classList.add("img-fluid")
    musicElementGuessed.getElementsByClassName("music-image")[0].classList.add("music-image-subresult")
    musicElementGuessed.getElementsByClassName("music-name")[0].classList.add("music-name-subresult")
    musicElementGuessed.getElementsByClassName("music-artist")[0].classList.add("music-artist-subresult")
    if (correctMusic.id === guessedMusic.id) {
        musicElementGuessed.getElementsByClassName("music-name")[0].classList.add("music-round-subpage-choice-ac")
        musicElementGuessed.getElementsByClassName("music-name")[0].classList.remove("music-round-subpage-choice-re")
        musicElementGuessed.getElementsByClassName("music-artist")[0].classList.add("music-round-subpage-choice-ac")
        musicElementGuessed.getElementsByClassName("music-artist")[0].classList.remove("music-round-subpage-choice-re")
    } else {
        musicElementGuessed.getElementsByClassName("music-name")[0].classList.add("music-round-subpage-choice-re")
        musicElementGuessed.getElementsByClassName("music-name")[0].classList.remove("music-round-subpage-choice-ac")
        musicElementGuessed.getElementsByClassName("music-artist")[0].classList.add("music-round-subpage-choice-re")
        musicElementGuessed.getElementsByClassName("music-artist")[0].classList.remove("music-round-subpage-choice-ac")
    }

    guessedMusicElement.appendChild(musicElementGuessed)
    
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