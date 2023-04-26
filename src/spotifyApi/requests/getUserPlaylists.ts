import User from "../../global/User"
import UserPlaylists from "../types/UserPlaylists"


export default async function getUserPlaylists(): Promise<UserPlaylists> {
    return fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'GET',
        headers: User.accessTokenHeader
    }).then(res => res.json())
}