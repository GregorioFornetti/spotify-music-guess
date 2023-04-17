import createMusicElement from '../../../components/music'
import playMusic from '../../../spotifyApi/requests/play'
import showSongResult from './songResult'
import { filterByMusicAndArtistName } from '../../../utils/filters'
import { PlaylistTrackObject } from '../../../spotifyApi/types/Playlist'
import shuffle from '../../../utils/shuffle'
import { toggleToSubpage } from '../../../utils/pageToggler'
import GameInfo from '../GameInfo'
import Track from '../../../spotifyApi/types/Track'
import Episode from '../../../spotifyApi/types/Episode'


var selectedMusicElement: HTMLElement | null = null
var selectedMusic: Track | Episode | null = null
var musicsNumberShuffled: number[]


export function initShowSongGuess() {

    musicsNumberShuffled = shuffle([...Array(GameInfo.playlist.tracks.items.length).keys()])
    selectedMusicElement = null
    selectedMusic = null
    
    // Tentar jogar no contentLoaded
    document.getElementById("song-guess-submit")!.onclick = () => {
        if (selectedMusic) {
            showSongResult(
                GameInfo.playlist.tracks.items[musicsNumberShuffled[GameInfo.roundNumber - 1]].track,
                selectedMusic
            )

            selectedMusic = null
            selectedMusicElement = null
        }
    }

    showSongGuess()
}
    

export default function showSongGuess() {

    const songGuessInput = document.getElementById('song-guess-input') as HTMLInputElement
    const artistGuessInput = document.getElementById('artist-guess-input') as HTMLInputElement

    songGuessInput.value = ''
    artistGuessInput.value = ''

    showMusics(GameInfo.playlist.tracks.items)

    playMusic(musicsNumberShuffled[GameInfo.roundNumber - 1], 5, GameInfo.playlistId)

    toggleToSubpage(GameInfo.pageId, 'song-guess-rounds-subpage')
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
            selectedMusic = music.track
        })

        if (selectedMusic && music.track.id === selectedMusic.id) {
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
        showMusics(
            filterByMusicAndArtistName(
                songGuessInput.value, 
                artistGuessInput.value, 
                GameInfo.playlist.tracks.items
            )
        )
    }

    songGuessInput.addEventListener('input', filterFunction)
    artistGuessInput.addEventListener('input', filterFunction)
})