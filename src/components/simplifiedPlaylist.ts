import SimplifiedPlaylist from "../spotifyApi/types/SimplifiedPlaylist";

export default function createSimplifiedPlaylistElement(simplifiedPlaylist: SimplifiedPlaylist) {
    const simplifiedPlaylistElement = document.createElement('div')
    simplifiedPlaylistElement.classList.add('simplified-playlist')

    const simplifiedPlaylistImage = document.createElement('img')
    simplifiedPlaylistImage.classList.add('simplified-playlist-image')

    const simplifiedPlaylistName = document.createElement('p')
    simplifiedPlaylistName.classList.add('simplified-playlist-name')
    simplifiedPlaylistName.innerText = simplifiedPlaylist.name

    if (simplifiedPlaylist.images.length !== 0) {
        simplifiedPlaylistImage.setAttribute('src', simplifiedPlaylist.images[0].url)
    }

    simplifiedPlaylistElement.appendChild(simplifiedPlaylistImage)
    simplifiedPlaylistElement.appendChild(simplifiedPlaylistName)

    return simplifiedPlaylistElement
}