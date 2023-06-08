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

    /**
     *  Reinicia o jogo. Deve ser chamada sempre que um jogo novo será iniciado
     */
    static reset() {
        this.resetCorrectAnswerCount()
        this.resetRoundNumber()
    }

    /**
     *  Informações da playlist em que o usuário está jogando
     */
    static get playlist() {
        return this._playlist;
    }

    static set playlist(playlist: Playlist) {
        this._playlist = playlist
    }

    /**
     *  ID da playlist em que o usuário está jogando
     */
    static get playlistId(): string {
        return this._playlistId
    }

    static set playlistId(playlistId: string) {
        this._playlistId = playlistId
    } 

    /**
     *  Número da rodada que o usuário está jogando ou acabou de jogar.
     */
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

    /**
     *  Número total de rodadas da partida.
     */
    static get totalRounds() {
        return this._totalRounds
    }

    static set totalRounds(totalRounds: number) {
        this._totalRounds = totalRounds
    }

    /**
     *  Número de partidas em que a resposta foi correta
     */
    static get correctAnswersCount() {
        return this._correctAnswerCount
    }

    static resetCorrectAnswerCount() {
        this._correctAnswerCount = 0
    }

    static increaseCorrectAnswerCount() {
        if (this._totalRounds <= this._correctAnswerCount) {
            throw new Error("Número de acertos não pode ser maior que o número total de rounds")
        }
        this._correctAnswerCount++
    }

    /**
     *  Modo de seleção de tocar a música, existem 2 tipos:
     *  - start: a música é tocada pelo inicio, e todas tentativas extras iniciam no ponto em que parou de tocar a última vez.
     *  - random: a música é tocada em uma posição aleatória, toda tentativa extra seleciona uma nova posição para tocar, sem repetir algo que já
     *  tocado
     */
    static get musicPos() {
        return this._musicPos
    }

    static set musicPos(musicPos: "start"|"random") {
        this._musicPos = musicPos
    }

    /**
     *  Tempo, em segundos, em que as músicas serão tocadas
     */
    static get musicPlaytime() {
        return this._musicPlaytime
    }

    static set musicPlaytime(musicPlaytime: number) {
        this._musicPlaytime = musicPlaytime
    }

    /**
     *  Quantidade de músicas que serão possíveis de escolher por rodada.
     *  
     *  OBS: isso não é o mesmo que o número de músicas disponiveis da playlist,
     *  isso faz parte da configuração do jogo e o usuário pode mudar esse número
     */
    static get musicsQnt() {
        return this._musicsQnt
    }

    static set musicsQnt(musicsQnt: number) {
        this._musicsQnt = musicsQnt
    }

    /**
     *  Se for verdadeiro, o usuário poderá ter tentativas extras, ou seja, ouvir mais trechos da música.
     */
    static get extraTries() {
        return this._extraTries
    }

    static set extraTries(extraTries: boolean) {
        this._extraTries = extraTries
    }
}