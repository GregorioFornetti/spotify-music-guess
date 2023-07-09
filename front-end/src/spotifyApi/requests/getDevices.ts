import Device from "../types/Device"
import User from "../../global/User"
import { addLoadingWithConditional } from "../../utils/addLoading"


async function makeGetDevicesRequest(): Promise<Device[]> {
    return fetch("https://api.spotify.com/v1/me/player/devices", {
        headers: User.accessTokenHeader,
        method: "GET"
    })
    .then(res => res.json())
    .then(data => data.devices)
}


/**
 * 
 *  Coleta os dispositivos que podem ser utilizados para tocar músicas
 * 
 *  @param hasLoading - Adiciona no documento um modal de carregamento. O modal é fechado quando a solicitação é finalizada
 * 
 *  @returns uma promessa de um array de objetos do tipo Device, contendo os dispositivos que podem ser utilizados para tocar músicas
 *  
 */
export default async function getDevicees(hasLoading?: boolean): Promise<Device[]> {
    return addLoadingWithConditional(makeGetDevicesRequest, hasLoading)
}