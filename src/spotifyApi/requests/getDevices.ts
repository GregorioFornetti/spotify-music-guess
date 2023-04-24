import Device from "../types/Device"
import User from "../../global/User"



export default async function getDevices(): Promise<Device[]> {
    return fetch("https://api.spotify.com/v1/me/player/devices", {
        headers: User.accessTokenHeader,
        method: "GET"
    })
    .then(res => res.json())
    .then(data => data.devices)
}
