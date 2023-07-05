/*
    Página home, na qual usuário pode escolher a playlist que vai jogar
*/
import getSpotifyId from "../utils/getSpotifyID"
import showPlaylistInfo from "./playlistInfo"
import getPlaylist from "../spotifyApi/requests/getPlaylist"
import getDevices from "../spotifyApi/requests/getDevices"
import createDeviceElement from "../components/device"
import createSimplifiedPlaylistElement from "../components/simplifiedPlaylist"
import selectDevice from "../spotifyApi/requests/selectDevice"
import getUserPlaylists from "../spotifyApi/requests/getUserPlaylists"
import SimplifiedPlaylist from "../spotifyApi/types/SimplifiedPlaylist"
import UserPlaylists from "../spotifyApi/types/UserPlaylists"
import User from "../global/User"
import getSimplifiedPlaylist from "../spotifyApi/requests/getSimplifiedPlaylist"
import PlayAgainPlaylistsIds from "../global/PlayAgainPlaylistsIds"
import Playlist from "../spotifyApi/types/Playlist"
import addLoading from "../utils/addLoading"


async function loadDevices() {
    return getDevices().then(devices => {
        if (!devices) {
            console.log('Não foi possível carregar os dispositivos')
        }

        const devicesListElement = document.getElementById('devices-list') as HTMLElement

        for (const device of devices) {
            const deviceElement = createDeviceElement(device)
            deviceElement.addEventListener('click', async () => {
                if (device.id) {
                    await selectDevice(device.id)
                    for (let i = 0; i < devicesListElement.children.length; i++) {
                        const element = devicesListElement.children[i] as HTMLElement
                        element.classList.remove('selected')
                        element.getElementsByClassName('device-is-selected-text')[0].innerHTML = ""
                    }
                    deviceElement.classList.add('selected')
                    deviceElement.getElementsByClassName('device-is-selected-text')[0].innerHTML = "Dispositivo selecionado"
                    
                    document.getElementById('no-device-selected')!.style.display = 'none'
                }
            })
            devicesListElement.appendChild(deviceElement)
        }

        if (devices.length === 0) {
            document.getElementById('no-devices-found')!.style.display = 'block'
        } else if (!devices.some(device => device.is_active)) {
            document.getElementById('no-device-selected')!.style.display = 'block'
        }
    })
}

function addSimplifiedPlaylistElements(simplifiePlaylists: SimplifiedPlaylist[], container: HTMLElement) {
    for (const simplifiedPlaylist of simplifiePlaylists) {
        const playlistElement = createSimplifiedPlaylistElement(simplifiedPlaylist, true)
        playlistElement.addEventListener('click', async () => {
            const playlistId = simplifiedPlaylist.id
            const playlist = await getPlaylist(playlistId, true)
            showPlaylistAndSave(playlist, playlistId)
        })
        container.appendChild(playlistElement)
    }
}

async function loadUserPlaylists() {
    return getUserPlaylists().then(userPlaylists => {
        const userPlaylistsElement = document.getElementById('user-playlists-list') as HTMLElement
        const loadMoreButton = document.getElementById('user-playlists-load-more') as HTMLButtonElement

        addSimplifiedPlaylistElements(userPlaylists.items, userPlaylistsElement)

        let next = userPlaylists.next

        if (next) {
            loadMoreButton.onclick = (() => {
                addLoading(async () => {
                    await fetch(next as string, {
                        method: 'GET',
                        headers: User.accessTokenHeader
                    })
                    .then(response => response.json())
                    .then((userPlaylists: UserPlaylists) => {
                        addSimplifiedPlaylistElements(userPlaylists.items, userPlaylistsElement)
                        next = userPlaylists.next
                        if (!next) {
                            loadMoreButton.style.display = 'none'
                        }
                    })
                })
            })
        } else {
            loadMoreButton.style.display = 'none'
        }
    })
}

async function loadPlayAgainPlaylists() {
    const playAgainPlaylistsIds = PlayAgainPlaylistsIds.getPlaylistsIds()
    const playAgainPlaylistsElement = document.getElementById('play-again-list') as HTMLElement
    const loadMoreButton = document.getElementById('play-again-load-more') as HTMLButtonElement
    const playlistsPerLoad = 8
    let currentPlaylistIndex = 0

    return Promise.all(
        playAgainPlaylistsIds
        .slice(currentPlaylistIndex, currentPlaylistIndex + playlistsPerLoad)
        .map(async (playlistId) => {
            return getSimplifiedPlaylist(playlistId)
        })
    ).then(simplifiedPlaylists => {
        
        addSimplifiedPlaylistElements(simplifiedPlaylists, playAgainPlaylistsElement)
        currentPlaylistIndex += playlistsPerLoad

        if (currentPlaylistIndex >= playAgainPlaylistsIds.length) {
            loadMoreButton.style.display = 'none'
        } else {
            loadMoreButton.onclick = (() => {
                addLoading(async () => {
                    await Promise.all(
                        playAgainPlaylistsIds
                        .slice(currentPlaylistIndex, currentPlaylistIndex + playlistsPerLoad)
                        .map(async (playlistId) => {
                            return getSimplifiedPlaylist(playlistId)
                        })
                    ).then(simplifiedPlaylists => {
                        addSimplifiedPlaylistElements(simplifiedPlaylists, playAgainPlaylistsElement)
                        currentPlaylistIndex += playlistsPerLoad
                        if (currentPlaylistIndex >= playAgainPlaylistsIds.length) {
                            loadMoreButton.style.display = 'none'
                        }
                    })
                })
                
            })
        }
    })
    
}


export default async function loadHomePage() {
    /*addLoading(async () => {
        await Promise.all([
            loadDevices(),
            loadUserPlaylists(),
            loadPlayAgainPlaylists()
        ])
    })*/
}

function showPlaylistAndSave(playlist: Playlist, playlistId: string) {
    const playlistsContainer = document.getElementById('play-again-list') as HTMLElement
    showPlaylistInfo(playlist, playlistId)
    const replacedIndex = PlayAgainPlaylistsIds.savePlaylistId(playlistId)
    if (replacedIndex !== -1 && playlistsContainer.children.length > replacedIndex) {
        playlistsContainer.removeChild(playlistsContainer.children[replacedIndex])
    }
    
    const playlistElement = createSimplifiedPlaylistElement(playlist, true)
    playlistElement.addEventListener('click', async () => {
        showPlaylistAndSave(playlist, playlistId)
    })
    playlistsContainer.insertBefore(playlistElement, playlistsContainer.children[0])
}

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById("playlist-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const playlist_input_str = (<HTMLInputElement>document.getElementById("playlist-input")).value;
        try {
            const playlistId = getSpotifyId(playlist_input_str)
            const playlist = await getPlaylist(playlistId, true)

            showPlaylistAndSave(playlist, playlistId)

        } catch (error) {
            console.log(error)
        }
    })
})