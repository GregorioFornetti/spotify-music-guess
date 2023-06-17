import User from "../../global/User"
import { addLoadingWithConditional } from "../../utils/addLoading"


async function makePauseRequest(): Promise<void> {
    await fetch("https://api.spotify.com/v1/me/player/pause", {
        method: "PUT",
        headers: User.accessTokenHeader,
    })
    return
}

/**
 * 
 *  Pausa o player do spotify (para de tocar a música/episódio que estiver tocando no spotify)
 * 
 *  @param hasLoading - Adiciona no documento um modal de carregamento. O modal é fechado quando a solicitação é finalizada
 * 
 */
export default function pause(hasLoading?: boolean): Promise<void> {
    return addLoadingWithConditional(makePauseRequest, hasLoading)
}