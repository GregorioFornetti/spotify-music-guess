import SimplifiedPlaylist from "../spotifyApi/types/SimplifiedPlaylist";

export default function createSimplifiedPlaylistElement(simplifiedPlaylist: SimplifiedPlaylist, selectable: boolean) {
    const simplifiedPlaylistElement = document.createElement('div')
    simplifiedPlaylistElement.classList.add('simplified-playlist-container')
    if (selectable) {
        simplifiedPlaylistElement.classList.add('selectable')
    }

    const simplifiedPlaylistImage = document.createElement('img')
    simplifiedPlaylistImage.classList.add('simplified-playlist-image')
    if (simplifiedPlaylist.images.length !== 0) {
        simplifiedPlaylistImage.setAttribute('src', simplifiedPlaylist.images[0].url)
    }

    const simplifiedPlaylistName = document.createElement('p')
    simplifiedPlaylistName.classList.add('simplified-playlist-name')
    simplifiedPlaylistName.innerText = simplifiedPlaylist.name

    const simplifiedPlaylistDescription = document.createElement('p')
    simplifiedPlaylistDescription.classList.add('simplified-playlist-description')
    if (simplifiedPlaylist.description) {
        simplifiedPlaylistDescription.innerText = simplifiedPlaylist.description
    } else {
        simplifiedPlaylistDescription.innerText = `De ${simplifiedPlaylist.owner.display_name}`
    }

    simplifiedPlaylistElement.appendChild(simplifiedPlaylistImage)
    simplifiedPlaylistElement.appendChild(simplifiedPlaylistName)
    simplifiedPlaylistElement.appendChild(simplifiedPlaylistDescription)

    return simplifiedPlaylistElement
}