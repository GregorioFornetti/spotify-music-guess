import User from "../../global/User"


/**
 * 
 *  Pausa o player do spotify (para de tocar a música/episódio que estiver tocando no spotify)
 * 
 */
export default function pause(): void {
    fetch("https://api.spotify.com/v1/me/player/pause", {
        method: "PUT",
        headers: User.accessTokenHeader,
    })
}