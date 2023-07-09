
import User from "../../global/User"
import { addLoadingWithConditional } from "../../utils/addLoading"



async function makeSelectDeviceRequest(deviceId: string): Promise<Response> {
    return fetch("https://api.spotify.com/v1/me/player", {
        headers: User.accessTokenHeader,
        method: "PUT",
        body: JSON.stringify({
            device_ids: [deviceId]
        })
    })
}


/**
 *
 *  Seleciona um dispositivo para tocar músicas
 * 
 *  @param hasLoading - Adiciona no documento um modal de carregamento. O modal é fechado quando a solicitação é finalizada
 * 
 *  @param {string} deviceId - ID do dispositivo que será selecionado
 * 
 */
export default async function selectDevice(deviceId: string, hasLoading?: boolean): Promise<Response> {
    return addLoadingWithConditional(makeSelectDeviceRequest, hasLoading, deviceId)
}