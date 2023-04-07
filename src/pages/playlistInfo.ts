
import toggleToPage from './pageToggler'

export default function showPlaylistInfo(playlist: any): void {
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

    toggleToPage('playlist-info-page')
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("playlist-return")?.addEventListener("click", () => {
        toggleToPage('playlist-selection-page')
    })
})