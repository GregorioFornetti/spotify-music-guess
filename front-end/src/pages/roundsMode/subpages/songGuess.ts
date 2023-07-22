/*
    Página principal do modo de jogo de rodadas, na qual o usuário deve escolher qual música acredita ser a correta.
*/

import showSongResult from './songResult'
import Playlist, { PlaylistTrackObject } from '../../../spotifyApi/types/Playlist'
import shuffle from '../../../utils/shuffle'
import toggleToSubpage from '../subpageToggler'
import GameInfo from '../GameInfo'
import Track from '../../../spotifyApi/types/Track'
import Episode from '../../../spotifyApi/types/Episode'
import MusicPlayer from '../../../utils/MusicPlayers/MusicPlayer'
import RandomMusicPlayer from '../../../utils/MusicPlayers/RandomMusicPlayer'
import SequentialMusicPlayer from '../../../utils/MusicPlayers/SequentialMusicPlayer'
import formatTime from '../../../utils/formatTime'
import PreviewMusicPlayer from '../../../utils/MusicPlayers/PreviewMusicPlayer'
import createPlaylistElement from '../../../components/playlist'


var selectedMusic: Track | Episode | null = null
var musicsNumberShuffled: number[]
var MusicPlayerClass: (typeof RandomMusicPlayer) | (typeof SequentialMusicPlayer) | (typeof PreviewMusicPlayer)
var musicPlayer: MusicPlayer
var possibleMusics: PlaylistTrackObject[]
var intervalId: number = -1


export async function initShowSongGuess() {

    musicsNumberShuffled = shuffle([...Array(GameInfo.playlist.tracks.items.length).keys()])
    selectedMusic = null
    
    const extraTriesBtn = document.getElementById('song-guess-hear-next') as HTMLButtonElement
    if (GameInfo.extraTries) {
        extraTriesBtn.disabled = false
    } else {
        extraTriesBtn.disabled = true
    }

    const timerElement = document.getElementById('rounds-mode-timer') as HTMLElement
    timerElement.innerHTML = formatTime(0)
    if (intervalId !== -1) {
        clearInterval(intervalId)
    }

    await showSongGuess()
}
    

export default async function showSongGuess() {

    const songGuessInput = document.getElementById('song-guess-input') as HTMLInputElement
    const artistGuessInput = document.getElementById('artist-guess-input') as HTMLInputElement

    songGuessInput.value = ''
    artistGuessInput.value = ''

    if (GameInfo.playlist.tracks.items.length === GameInfo.musicsQnt) {
        possibleMusics = GameInfo.playlist.tracks.items
    } else {
        let possibleMusicsIndexes: number[] = [musicsNumberShuffled[GameInfo.roundNumber - 1]]

        let randomMusicsIndexes = [...musicsNumberShuffled]
        delete randomMusicsIndexes[GameInfo.roundNumber - 1]
        randomMusicsIndexes = shuffle(randomMusicsIndexes)
        for (let i = 0; i < GameInfo.musicsQnt - 1; i++) {
            possibleMusicsIndexes.push(randomMusicsIndexes[i])
        }
        possibleMusicsIndexes.sort()

        possibleMusics = possibleMusicsIndexes.map((musicIndex) => GameInfo.playlist.tracks.items[musicIndex])
    }

    const filteredPlaylist = GameInfo.playlist
    filteredPlaylist.tracks.items = possibleMusics
    showMusics(GameInfo.playlist)

    if (!GameInfo.isPremiumMode) {
        MusicPlayerClass = PreviewMusicPlayer
    } else if (GameInfo.musicPos === 'random') {
        MusicPlayerClass = RandomMusicPlayer
    } else if (GameInfo.musicPos === 'start') {
        MusicPlayerClass = SequentialMusicPlayer
    }
    musicPlayer = new MusicPlayerClass(
        GameInfo.playlist, 
        GameInfo.playlistId, 
        musicsNumberShuffled[GameInfo.roundNumber - 1], 
        GameInfo.musicPlaytime
    )

    await musicPlayer.play()
    
    const timerElement = document.getElementById('rounds-mode-timer') as HTMLElement
    intervalId = window.setInterval(() => {
        GameInfo.increaseCurrentTime()
        timerElement.innerHTML = formatTime(GameInfo.currentTime)
    }, 1000)

    toggleToSubpage('song-guess-rounds-subpage')
}

function showMusics(playlist: Playlist) {
    
    const playlistTracks = document.getElementById('playlist-tracks-list-game')!
    playlistTracks.innerHTML = ""

    playlistTracks.appendChild(createPlaylistElement(playlist, (music) => {
        selectedMusic = music
    }))
}

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("song-guess-submit")?.addEventListener('click', () => {
        if (selectedMusic) {
            clearInterval(intervalId)

            showSongResult(
                GameInfo.playlist.tracks.items[musicsNumberShuffled[GameInfo.roundNumber - 1]].track,
                selectedMusic
            )

            selectedMusic = null

            musicPlayer.pause()
            musicPlayer.close()
        }
    })

    document.getElementById('song-guess-hear-next')?.addEventListener('click', () => {
        musicPlayer.play()
    })
})