/*
    Página home, na qual usuário pode escolher a playlist que vai jogar
*/
import getSpotifyId from "../utils/getSpotifyID"
import showPlaylistInfo from "./playlistInfo"
import getPlaylist from "../spotifyApi/requests/getPlaylist"
import getDevices from "../spotifyApi/requests/getDevices"
import createDeviceElement from "../components/device"
import selectDevice from "../spotifyApi/requests/selectDevice"



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

    getDevices().then(devices => {
        const devicesListElement = document.getElementById('devices-list') as HTMLElement

        for (const device of devices) {
            const deviceElement = createDeviceElement(device)
            deviceElement.addEventListener('click', async () => {
                if (device.id) {
                    await selectDevice(device.id)
                    for (let i = 0; i < devicesListElement.children.length; i++) {
                        const element = devicesListElement.children[i] as HTMLElement
                        element.classList.remove('selected')
                    }
                    deviceElement.classList.add('selected')
                }
            })
            devicesListElement.appendChild(deviceElement)
        }

        if (devices.length === 0) {
            devicesListElement.innerHTML = "<p>Nenhum dispositivo encontrado. Abra o spotify em algum dispositivo e recarregue a página para selecionar algum dispositivo para tocar as músicas</p>"
        }
    })
})