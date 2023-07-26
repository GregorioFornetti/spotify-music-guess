import SimplifiedPlaylist from "../spotifyApi/types/SimplifiedPlaylist";

/**
 * 
 *  Cria um componente HTML que representa uma playlist simplificada (sem informações das músicas)
 * 
 *  @param simplifiedPlaylist - Objeto contendo as informações da playlist simplificada
 * 
 *  @param selectable - Se a playlist será selecionável ou não (se terá efeitos de seleção ou não)
 * 
 *  @returns Um elemento HTML que representa uma playlist simplificada
 * 
 */
export default function createSimplifiedPlaylistElement(simplifiedPlaylist: SimplifiedPlaylist, selectable: boolean): HTMLElement {
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