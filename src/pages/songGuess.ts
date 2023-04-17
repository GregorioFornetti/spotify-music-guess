import toggleToPage from './pageToggler'
import createMusicElement from '../components/music'
import playMusic from '../spotifyApi/requests/play'
import showSongResult from './songResult'
import showFinalResultPage from './finalResult'
import { filterByMusicAndArtistName } from '../utils/filters'
import { PlaylistTrackObject } from '../spotifyApi/types/Playlist'
import Playlist from '../spotifyApi/types/Playlist'
import shuffle from '../utils/shuffle'

var selectedMusicElement: HTMLElement | null = null
var selectedMusicId: string | null = null
var playlist: Playlist
var musicsNumberShuffled: number[]
var playlistId: string | null = null
var roundNumber: number = 1
var correctAnswerCount: number = 0


export function initShowSongGuess(playlistParam: Playlist, playlistIdParam: string) {
    playlist = playlistParam

    musicsNumberShuffled = shuffle([...Array(playlist.tracks.items.length).keys()])

    selectedMusicElement = null

    selectedMusicId = null
    
    playlistId = playlistIdParam

    roundNumber = 0

    correctAnswerCount = 0
    
    document.getElementById("song-guess-submit")!.onclick = () => {
        let correctAnswer = selectedMusicId === playlist.tracks.items[musicsNumberShuffled[roundNumber - 1]].track.id
        showSongResult(
            roundNumber, 
            5, 
            playlist.tracks.items[musicsNumberShuffled[roundNumber - 1]].track,
            playlist.tracks.items.filter((music: PlaylistTrackObject) => music.track.id === selectedMusicId)[0].track,
            correctAnswer
        )
        if (correctAnswer) {
            correctAnswerCount += 1
        }

        selectedMusicId = null
        selectedMusicElement = null
    }
}
    

export default function showSongGuess() {

    if (roundNumber >= 5) {
        showFinalResultPage(correctAnswerCount, 5)
        return
    }

    const songGuessInput = document.getElementById('song-guess-input') as HTMLInputElement
    const artistGuessInput = document.getElementById('artist-guess-input') as HTMLInputElement

    songGuessInput.value = ''
    artistGuessInput.value = ''
    roundNumber += 1

    showMusics(playlist.tracks.items)

    if (playlistId) {
        playMusic(musicsNumberShuffled[roundNumber - 1], 5, playlistId)
    } else {
        console.log('Playlist id não encontrado')
    }

    toggleToPage('song-guess-page')
}

function showMusics(musics: PlaylistTrackObject[]) {
    selectedMusicElement = null
    
    const playlistTracks = document.getElementById('playlist-tracks-list-game')!
    playlistTracks.innerHTML = ""

    for (let music of musics) {
        const musicElement = createMusicElement(music.track)
        musicElement.classList.add('clickable')
        musicElement.addEventListener('click', () => {
            if (selectedMusicElement) {
                selectedMusicElement.classList.remove('selected')
            }
            selectedMusicElement = musicElement
            selectedMusicElement.classList.add('selected')
            selectedMusicId = music.track.id
        })

        if (music.track.id === selectedMusicId) {
            selectedMusicElement = musicElement
            selectedMusicElement.classList.add('selected')
        }

        playlistTracks.appendChild(musicElement)
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const songGuessInput = document.getElementById('song-guess-input') as HTMLInputElement
    const artistGuessInput = document.getElementById('artist-guess-input') as HTMLInputElement
    const filterFunction = () => {
        showMusics(filterByMusicAndArtistName(songGuessInput.value, artistGuessInput.value, playlist.tracks.items))
    }
    songGuessInput.addEventListener('input', filterFunction)
    artistGuessInput.addEventListener('input', filterFunction)
})