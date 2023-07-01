

export default function createPlaylistElement(...args: any[]): HTMLElement {
    const playlistContainer = document.createElement('div')
    playlistContainer.innerHTML = 'PLAYLIST'

    return playlistContainer
}