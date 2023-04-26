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


async function loadDevices() {
    return getDevices().then(devices => {
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

async function loadUserPlaylists() {
    return getUserPlaylists().then(userPlaylists => {
        const userPlaylistsElement = document.getElementById('user-playlists-list') as HTMLElement

        for (const playlist of userPlaylists.items) {
            const playlistElement = createSimplifiedPlaylistElement(playlist)
            userPlaylistsElement.appendChild(playlistElement)
        }
    })
}


export default async function loadHomePage() {
    await Promise.all([
        loadDevices(),
        loadUserPlaylists()
    ])
}


document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById("playlist-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const playlist_input_str = (<HTMLInputElement>document.getElementById("playlist-input")).value;
        try {
            const playlistId = getSpotifyId(playlist_input_str)
            const playlist = await getPlaylist(playlistId)
            showPlaylistInfo(playlist, playlistId)
        } catch (error) {
            console.log(error)
        }
    })
})