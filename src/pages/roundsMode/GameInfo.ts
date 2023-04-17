import Playlist from "../../spotifyApi/types/Playlist"

export default class GameInfo {

    private static _playlist: Playlist
    private static _playlistId: string
    private static _roundNumber: number = 1
    private static _correctAnswerCount: number = 0
    private static _totalRounds: number = 0

    static reset() {
        this.resetCorrectAnswerCount()
        this.resetRoundNumber()
    }


    static get pageId() {
        return "rounds-mode-game-page"
    }
    

    static get playlist() {
        return this._playlist;
    }

    static set playlist(playlist: Playlist) {
        this._playlist = playlist
    }


    static get playlistId(): string {
        return this._playlistId
    }

    static set playlistId(playlistId: string) {
        this._playlistId = playlistId
    } 


    static get roundNumber() {
        return this._roundNumber
    }

    static resetRoundNumber() {
        this._roundNumber = 1
    }

    static increaseRoundNumber() {
        if (this._totalRounds <= this._roundNumber) {
            throw new Error("Número do round não pode ser maior que o número total de rounds")
        }
        this._roundNumber++
    }


    static get totalRounds() {
        return this._totalRounds
    }

    static set totalRounds(totalRounds: number) {
        this._totalRounds = totalRounds
    }


    static get correctAnswersCount() {
        return this._correctAnswerCount
    }

    static resetCorrectAnswerCount() {
        this._correctAnswerCount = 1
    }

    static increaseCorrectAnswerCount() {
        if (this._totalRounds <= this._correctAnswerCount) {
            throw new Error("Número do round não pode ser maior que o número total de rounds")
        }
        this._correctAnswerCount++
    }
}