/*
    Classe estática, com informações importantes que devem ser passadas entre as sub-páginas do modo de rodadas
*/

import Playlist from "../../spotifyApi/types/Playlist"

export default class GameInfo {

    private static _playlist: Playlist
    private static _playlistId: string
    private static _roundNumber: number
    private static _correctAnswerCount: number
    private static _totalRounds: number
    private static _musicPos: "start"|"random"
    private static _musicPlaytime: number
    private static _musicsQnt: number
    private static _extraTries: boolean

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
        this._correctAnswerCount = 0
    }

    static increaseCorrectAnswerCount() {
        if (this._totalRounds <= this._correctAnswerCount) {
            throw new Error("Número do round não pode ser maior que o número total de rounds")
        }
        this._correctAnswerCount++
    }


    static get musicPos() {
        return this._musicPos
    }

    static set musicPos(musicPos: "start"|"random") {
        this._musicPos = musicPos
    }


    static get musicPlaytime() {
        return this._musicPlaytime
    }

    static set musicPlaytime(musicPlaytime: number) {
        this._musicPlaytime = musicPlaytime
    }


    static get musicsQnt() {
        return this._musicsQnt
    }

    static set musicsQnt(musicsQnt: number) {
        this._musicsQnt = musicsQnt
    }

    
    static get extraTries() {
        return this._extraTries
    }

    static set extraTries(extraTries: boolean) {
        this._extraTries = extraTries
    }
}