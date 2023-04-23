/*
    Página principal do modo de jogo de rodadas, na qual o usuário deve escolher qual música acredita ser a correta.
*/

import createMusicElement from '../../../components/music'
import showSongResult from './songResult'
import { filterByMusicAndArtistName } from '../../../utils/filters'
import { PlaylistTrackObject } from '../../../spotifyApi/types/Playlist'
import shuffle from '../../../utils/shuffle'
import { toggleToSubpage } from '../../../utils/pageToggler'
import GameInfo from '../GameInfo'
import Track from '../../../spotifyApi/types/Track'
import Episode from '../../../spotifyApi/types/Episode'
import MusicPlayer from '../../../utils/MusicPlayers/MusicPlayer'
import RandomMusicPlayer from '../../../utils/MusicPlayers/RandomMusicPlayer'
import SequentialMusicPlayer from '../../../utils/MusicPlayers/SequentialMusicPlayer'


var selectedMusicElement: HTMLElement | null = null
var selectedMusic: Track | Episode | null = null
var musicsNumberShuffled: number[]
var MusicPlayerClass: (typeof RandomMusicPlayer) | (typeof SequentialMusicPlayer)
var musicPlayer: MusicPlayer


export function initShowSongGuess() {

    musicsNumberShuffled = shuffle([...Array(GameInfo.playlist.tracks.items.length).keys()])
    selectedMusicElement = null
    selectedMusic = null
    
    const extraTriesBtn = document.getElementById('song-guess-hear-next') as HTMLButtonElement
    if (GameInfo.extraTries) {
        extraTriesBtn.disabled = false
    } else {
        extraTriesBtn.disabled = true
    }

    showSongGuess()
}
    

export default function showSongGuess() {

    const songGuessInput = document.getElementById('song-guess-input') as HTMLInputElement
    const artistGuessInput = document.getElementById('artist-guess-input') as HTMLInputElement

    songGuessInput.value = ''
    artistGuessInput.value = ''

    showMusics(GameInfo.playlist.tracks.items)

    if (GameInfo.musicPos === 'random') {
        MusicPlayerClass = RandomMusicPlayer
    } else if (GameInfo.musicPos === 'start') {
        MusicPlayerClass = SequentialMusicPlayer
    }
    musicPlayer = new MusicPlayerClass(GameInfo.playlist, GameInfo.playlistId, musicsNumberShuffled[GameInfo.roundNumber - 1], GameInfo.musicPlaytime)

    musicPlayer.play()

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

    document.getElementById("song-guess-submit")?.addEventListener('click', () => {
        if (selectedMusic) {
            showSongResult(
                GameInfo.playlist.tracks.items[musicsNumberShuffled[GameInfo.roundNumber - 1]].track,
                selectedMusic
            )

            selectedMusic = null
            selectedMusicElement = null
        }
    })

    document.getElementById('song-guess-hear-next')?.addEventListener('click', () => {
        musicPlayer.play()
    })
})