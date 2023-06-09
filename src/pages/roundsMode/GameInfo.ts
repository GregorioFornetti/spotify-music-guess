/*
    Classe estática, com informações importantes que devem ser passadas entre as sub-páginas do modo de rodadas
*/

import Episode from "../../spotifyApi/types/Episode"
import Playlist from "../../spotifyApi/types/Playlist"
import Track from "../../spotifyApi/types/Track"

interface RoundInfo {
    // Tempo gasto pelo usuário durante a rodada
    timeSpent: number,
    // Música sorteada
    correctMusic: Track | Episode,
    // Música que o usuário escolheu como resposta
    guessedMusic: Track | Episode,
    // Número de tentativas extras utilizado pelo usuário
    extraTriesCount?: number
}

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
    private static _currentTime: number
    private static _extraTriesCount: number
    private static _roundsHistory: RoundInfo[]

    private static roundCurrentTime: number
    private static roundExtraTriesCount: number

    /**
     *  Reinicia o jogo. Deve ser chamada sempre que um jogo novo será iniciado
     */
    static reset() {
        this.resetCorrectAnswerCount()
        this.resetRoundNumber()
        this.resetCurrentTime()
        this.resetExtraTriesCount()
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


    /**
     *  Tempo, em segundos, que o usuário passou em jogo
     */
    static get currentTime() {
        return this._currentTime
    }

    static resetCurrentTime() {
        this._currentTime = 0
        this.roundCurrentTime = 0
    }

    static increaseCurrentTime() {
        this._currentTime++
    }


    /**
     *  Número de tentativas extras utilizadas pelo usuário
     */
    static get extraTriesCount() {
        return this._extraTriesCount
    }

    static resetExtraTriesCount() {
        this._extraTriesCount = 0
        this.roundExtraTriesCount = 0
    }

    static increaseExtraTriesCount() {
        this._extraTriesCount++
    }

    
    /**
     *  Histórico das rodadas que o usuário jogou.
     *  Basicamente, uma lista contendo informações sobre cada rodada jogada pelo usuário
     */
    static get roundsHistory() {
        return this._roundsHistory
    }

    static resetRoundsHistory() {
        this._roundsHistory = []
    }

    static addRoundHistory(correctMusic: Track | Episode, guessedMusic: Track | Episode,) {
        if (this.extraTries) {
            this._roundsHistory.push({
                timeSpent: this.roundCurrentTime,
                correctMusic: correctMusic,
                guessedMusic: guessedMusic,
            })
        } else {
            this._roundsHistory.push({
                timeSpent: this.roundCurrentTime,
                correctMusic: correctMusic,
                guessedMusic: guessedMusic,
                extraTriesCount: this.roundExtraTriesCount
            })
        }
        this.roundCurrentTime = 0
        this.roundExtraTriesCount = 0
    }

    /**
     *  Retorna a pontuação que o usuário obteve no jogo
     */
    static get score() {
        return Math.max(
            (this._correctAnswerCount * 500) - 
            (this._currentTime + this._extraTriesCount * 25)
            , 50 * this._correctAnswerCount
        )
    }
}