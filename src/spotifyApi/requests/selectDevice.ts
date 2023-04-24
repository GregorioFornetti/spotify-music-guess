
import User from "../../global/User"

export default async function selectDevice(deviceId: string) {
    return fetch("https://api.spotify.com/v1/me/player", {
        headers: User.accessTokenHeader,
        method: "PUT",
        body: JSON.stringify({
            device_ids: [deviceId]
        })
    })
}