
import toggleToPage from './pageToggler'
import createMusicElement from '../components/music'
import AccessToken from '../AccessToken'

var selectedMusicElement: HTMLElement | null = null
var playlist: any
var musicsNumberShuffled: any
var playlistId: string | null = null


async function playMusic(musicPos: number, duration: number) {
    console.log(playlistId)
    await fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: AccessToken.accessTokenHeader,
        body: JSON.stringify({
            context_uri: `spotify:playlist:${playlistId}`,
            headers: AccessToken.accessTokenHeader,
            position_ms: 0,
            offset: {
                position: musicPos
            }
        })
    })

    setTimeout(() => {
        fetch("https://api.spotify.com/v1/me/player/pause", {
            method: "PUT",
            headers: AccessToken.accessTokenHeader,
        })
    }, duration * 1000)
}

export function initShowSongGuess(playlist_param: any, playlistId_param: string) {
    playlist = playlist_param

    musicsNumberShuffled = [...Array(playlist.tracks.items.length).keys()]
    for (let i = musicsNumberShuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [musicsNumberShuffled[i], musicsNumberShuffled[j]] = [musicsNumberShuffled[j], musicsNumberShuffled[i]];
    }

    selectedMusicElement = null
    
    playlistId = playlistId_param
}

export default function showSongGuess(roundNumber: number) {

    const playlistTracks = document.getElementById('playlist-tracks-list-game')!
    playlistTracks.innerHTML = ""
    for (let music of playlist.tracks.items) {
        const musicElement = createMusicElement(music.track)
        musicElement.classList.add('clickable')
        musicElement.addEventListener('click', () => {
            if (selectedMusicElement) {
                selectedMusicElement.classList.remove('selected')
            }
            selectedMusicElement = musicElement
            selectedMusicElement.classList.add('selected')
        })

        playlistTracks.appendChild(musicElement)
    }

    playMusic(musicsNumberShuffled[roundNumber - 1], 5)

    toggleToPage('song-guess-page')
}