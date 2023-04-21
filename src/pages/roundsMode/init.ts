

import Playlist from "../../spotifyApi/types/Playlist"
import { initShowSongGuess } from "./subpages/songGuess"
import GameInfo from "./GameInfo"
import toggleToPage from "../../utils/pageToggler"

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
    GameInfo.totalRounds = 5
    
    initShowSongGuess()

    toggleToPage(GameInfo.pageId)
}