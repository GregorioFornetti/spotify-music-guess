import User from "../../global/User"
import UserPlaylists from "../types/UserPlaylists"

/**
 * 
 *   Retorna as playlists do usuário(da biblioteca do usuário, ou seja, criadas por ele ou que ele segue)
 *  
 *   @returns As playlists do usuário
 *  
 */
export default async function getUserPlaylists(): Promise<UserPlaylists> {
    return fetch('https://api.spotify.com/v1/me/playlists?limit=8', {
        method: 'GET',
        headers: User.accessTokenHeader
    }).then(res => res.json())
}