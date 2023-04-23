

import Playlist from "../../spotifyApi/types/Playlist"
import GameInfo from "./GameInfo"
import toggleToPage from "../../utils/pageToggler"
import initConfigSubpage from "./subpages/configs"

/**
 * 
 *  Inicializa o jogo no modo de rodadas, após usuário ter decidido a playlist que irá jogar
 * 
 * @param playlistParam - objeto contendo informações da playlist
 * 
 * @param playlistIdParam - ID da playlist
 * 
 */
export default function init(playlistParam: Playlist, playlistIdParam: string) {

    GameInfo.reset()
    GameInfo.playlist = playlistParam
    GameInfo.playlistId = playlistIdParam
    
    initConfigSubpage()

    toggleToPage(GameInfo.pageId)
}