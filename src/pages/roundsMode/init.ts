import Playlist from "../../spotifyApi/types/Playlist"
import { initShowSongGuess } from "./subpages/songGuess"
import GameInfo from "./GameInfo"
import toggleToPage from "../../utils/pageToggler"




export default function init(playlistParam: Playlist, playlistIdParam: string) {

    GameInfo.reset()
    GameInfo.playlist = playlistParam
    GameInfo.playlistId = playlistIdParam
    GameInfo.totalRounds = 5
    
    initShowSongGuess()

    toggleToPage(GameInfo.pageId)
}