
import toggleToPage from './pageToggler'
import createMusicElement from '../components/music'
import AccessToken from '../AccessToken'

var selectedMusicElement: HTMLElement | null = null
var selectedMusicId: string | null = null
var playlist: any
var musicsNumberShuffled: any
var playlistId: string | null = null
var roundNumber: number = 1


function filterByMusicName(musicName: string, musics: any) {
    return musics.filter((music: any) => {
        return music.track.name.toLowerCase().startsWith(musicName.toLowerCase())
    })
}

function filterByArtistName(artistName: string, musics: any) {
    return musics.filter((music: any) => {
        return music.track.artists[0].name.toLowerCase().startsWith(artistName.toLowerCase())
    })
}

function filterByMusicAndArtistName(musicName: string, artistName: string, musics: any) {
    return filterByMusicName(musicName, filterByArtistName(artistName, musics))
}


async function playMusic(musicPos: number, duration: number) {
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

export function initShowSongGuess(playlistParam: any, playlistIdParam: string) {
    playlist = playlistParam

    musicsNumberShuffled = [...Array(playlist.tracks.items.length).keys()]
    for (let i = musicsNumberShuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [musicsNumberShuffled[i], musicsNumberShuffled[j]] = [musicsNumberShuffled[j], musicsNumberShuffled[i]];
    }

    selectedMusicElement = null

    selectedMusicId = null
    
    playlistId = playlistIdParam

    roundNumber = 1
}

export default function showSongGuess() {

    showMusics(playlist.tracks.items)

    playMusic(musicsNumberShuffled[roundNumber - 1], 5)

    toggleToPage('song-guess-page')
}

function showMusics(musics: any) {
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
    document.getElementById("song-guess-submit")?.addEventListener("click", () => {
        if (selectedMusicId === playlist.tracks.items[musicsNumberShuffled[0]].track.id) {
            alert("Você acertou!")
        } else {
            alert("Você errou!")
        }
    })

    const songGuessInput = document.getElementById('song-guess-input') as HTMLInputElement
    const artistGuessInput = document.getElementById('artist-guess-input') as HTMLInputElement
    const filterFunction = () => {
        showMusics(filterByMusicAndArtistName(songGuessInput.value, artistGuessInput.value, playlist.tracks.items))
    }
    songGuessInput.addEventListener('input', filterFunction)
    artistGuessInput.addEventListener('input', filterFunction)
})