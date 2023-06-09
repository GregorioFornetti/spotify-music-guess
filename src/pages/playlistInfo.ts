/*
    Página com informações da playlist escolhida pelo usuário
*/
import toggleToPage from '../utils/pageToggler'
import createMusicElement from '../components/music'
import Playlist from '../spotifyApi/types/Playlist'
import initRoundsModeGame from './roundsMode/init'

export default function showPlaylistInfo(playlist: Playlist, playlistId: string): void {
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

    document.getElementById("playlist-tracks-count")!.innerText = String(playlist.tracks.total)

    const playlistTracks = document.getElementById('playlist-tracks-list')!
    playlistTracks.innerHTML = ""
    for (let music of playlist.tracks.items) {
        playlistTracks.appendChild(createMusicElement(music.track))
    }

    document.getElementById('game-start')!.onclick = () => {

        initRoundsModeGame(playlist, playlistId)
    }

    toggleToPage('playlist-info-page')
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("playlist-return")?.addEventListener("click", () => {
        toggleToPage('home-page')
    })
})