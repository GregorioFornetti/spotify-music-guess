import Device from "../types/Device"
import User from "../../global/User"


/**
 * 
 *  Coleta os dispositivos que podem ser utilizados para tocar músicas
 * 
 *  @returns uma promessa de um array de objetos do tipo Device, contendo os dispositivos que podem ser utilizados para tocar músicas
 *  
 */
export default async function getDevices(): Promise<Device[]> {
    return fetch("https://api.spotify.com/v1/me/player/devices", {
        headers: User.accessTokenHeader,
        method: "GET"
    })
    .then(res => res.json())
    .then(data => data.devices)
}
