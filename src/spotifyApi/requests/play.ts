import User from "../../global/User"
import pause from "./pause"

export default async function playMusic(musicPos: number, duration: number, playlistId: string) {
    await fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: User.accessTokenHeader,
        body: JSON.stringify({
            context_uri: `spotify:playlist:${playlistId}`,
            position_ms: 0,
            offset: {
                position: musicPos
            }
        })
    })

    setTimeout(() => {
        pause()
    }, duration * 1000)
}