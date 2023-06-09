import User from "../../global/User"
import pause from "./pause"

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
 *  @returns timeout ID, para que seja possível cancelar o pause.
 *  
 */
export default async function playMusic(musicPos: number, duration: number, playlistId: string, musicPlayPos?: number): Promise<number> {
    let playPos: number = 0
    if (musicPlayPos) {
        playPos = musicPlayPos
    }

    await fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: User.accessTokenHeader,
        body: JSON.stringify({
            context_uri: `spotify:playlist:${playlistId}`,
            position_ms: playPos,
            offset: {
                position: musicPos
            }
        })
    })

    return setTimeout(() => {
        pause()
    }, duration * 1000)
}