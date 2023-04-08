
import toggleToPage from './pageToggler'
import createMusicElement from '../components/music'
import showSongGuess, { initShowSongGuess } from './songGuess'

export default function showPlaylistInfo(playlist: any, playlistId: string): void {
    document.getElementById('playlist-image')!.setAttribute('src', playlist.images[0].url)

    document.getElementById('playlist-name')!.innerText = playlist.name

    if (playlist.description) {
        document.getElementById('playlist-description')!.innerText = playlist.description
    } else {
        document.getElementById('playlist-description')!.innerText = "Sem descrição"
    }

    if (playlist.owner.display_name) {
        document.getElementById('playlist-owner')!.innerText = playlist.owner.display_name
    } else {
        document.getElementById('playlist-owner')!.innerText = ""
    }

    document.getElementById("playlist-tracks-count")!.innerText = playlist.tracks.total

    const playlistTracks = document.getElementById('playlist-tracks-list')!
    playlistTracks.innerHTML = ""
    for (let music of playlist.tracks.items) {
        playlistTracks.appendChild(createMusicElement(music.track))
    }

    document.getElementById('game-start')!.onclick = () => {

        initShowSongGuess(playlist, playlistId)
        showSongGuess()
    }

    toggleToPage('playlist-info-page')
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("playlist-return")?.addEventListener("click", () => {
        toggleToPage('playlist-selection-page')
    })
})