

import GameInfo from "./GameInfo"
import toggleToPage from "../../utils/pageToggler"
import initConfigSubpage from "./subpages/configs"
import ExtendedPlaylist from "../../spotifyApi/types/ExtendedPlaylist"

/**
 * 
 *  Inicializa o jogo no modo de rodadas, após usuário ter decidido a playlist que irá jogar
 * 
 * @param playlistParam - objeto contendo informações da playlist
 * 
 * @param playlistIdParam - ID da playlist
 * 
 */
export default function init(playlistParam: ExtendedPlaylist, playlistIdParam: string) {

    GameInfo.reset()
    GameInfo.playlist = playlistParam
    GameInfo.playlistId = playlistIdParam
    
    initConfigSubpage()

    toggleToPage('rounds-mode-game-page')
}