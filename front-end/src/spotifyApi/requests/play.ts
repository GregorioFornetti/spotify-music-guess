import User from "../../global/User"
import { addLoadingWithConditional } from "../../utils/addLoading"
import pause from "./pause"


async function makePlayMusicRequest(duration: number, trackURI: string, musicPlayPos?: number): Promise<number> {
    let playPos: number = 0
    if (musicPlayPos) {
        playPos = musicPlayPos
    }

    await fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: User.accessTokenHeader,
        body: JSON.stringify({
            uris: [trackURI],
            position_ms: playPos
        })
    })

    return window.setTimeout(() => {
        pause()
    }, duration * 1000)
}


/**
 * 
 *  Começa a tocar uma música/episódio no player do spotify, dentro de uma playlist.
 * 
 *  @param musicPos - posição da música que será tocada. **Importante:** a posição da música começa a partir de 0, 
 *  então, por exemplo, musicPos = 1 tocará a segunda música da playlist
 * 
 *  @param duration - quanto tempo, **em segundos (s)**, a música será tocada
 * 
 *  @param playlistId - ID da playlist que será tocada
 * 
 *  @param musicPlayPos - posição em **milisegundos (ms)** em que a música começará a ser tocada
 *  
 *  @param hasLoading - Adiciona no documento um modal de carregamento. O modal é fechado quando a solicitação é finalizada
 *  
 *  @returns timeout ID, para que seja possível cancelar o pause.
 *  
 */
export default async function playMusic(duration: number, trackURI: string, musicPlayPos?: number, hasLoading?: boolean): Promise<number> {
    return addLoadingWithConditional(makePlayMusicRequest, hasLoading, duration, trackURI, musicPlayPos)
}