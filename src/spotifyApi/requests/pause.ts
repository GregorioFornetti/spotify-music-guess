import User from "../../global/User"


export default function pause() {
    fetch("https://api.spotify.com/v1/me/player/pause", {
        method: "PUT",
        headers: User.accessTokenHeader,
    })
}