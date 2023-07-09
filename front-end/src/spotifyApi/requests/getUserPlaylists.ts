import User from "../../global/User"
import { addLoadingWithConditional } from "../../utils/addLoading"
import UserPlaylists from "../types/UserPlaylists"


async function makeGetUserPlaylistsRequest(): Promise<UserPlaylists> {
    return fetch('https://api.spotify.com/v1/me/playlists?limit=8', {
        method: 'GET',
        headers: User.accessTokenHeader
    }).then(res => res.json())
}

/**
 * 
 *   Retorna as playlists do usuário(da biblioteca do usuário, ou seja, criadas por ele ou que ele segue)
 * 
 *   @param hasLoading - Adiciona no documento um modal de carregamento. O modal é fechado quando a solicitação é finalizada
 *  
 *   @returns As playlists do usuário
 *  
 */
export default async function getUserPlaylists(hasLoading?: boolean): Promise<UserPlaylists> {
    return addLoadingWithConditional(makeGetUserPlaylistsRequest, hasLoading)
}