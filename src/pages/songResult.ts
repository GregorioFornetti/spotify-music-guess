
import toggleToPage from "./pageToggler"
import createMusicElement from "../components/music"
import showSongGuess from "./songGuess"
import Track from "../spotifyApi/types/Track"
import Episode from "../spotifyApi/types/Episode"


export default function showSongResult(roundNumber: number, totalRounds: number, correctMusic: Track|Episode, guessedMusic: Track|Episode, correctAnswer: boolean) {

    if (correctAnswer) {
        document.getElementById('song-result-message')!.innerText = 'Você acertou !'
    } else {
        document.getElementById('song-result-message')!.innerText = 'Você errou !'
    }

    document.getElementById("song-result-current-round")!.innerText = roundNumber.toString()

    document.getElementById("song-result-total-rounds")!.innerText = totalRounds.toString()

    const correctMusicElement = document.getElementById("song-result-correct-song") as HTMLElement
    correctMusicElement.innerHTML = ""
    correctMusicElement.appendChild(createMusicElement(correctMusic))

    const guessedMusicElement = document.getElementById("song-result-guessed-song") as HTMLElement
    guessedMusicElement.innerHTML = ""
    guessedMusicElement.appendChild(createMusicElement(guessedMusic))

    toggleToPage('song-result-page')
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("song-result-next")?.addEventListener("click", () => {
        showSongGuess()
    })
})