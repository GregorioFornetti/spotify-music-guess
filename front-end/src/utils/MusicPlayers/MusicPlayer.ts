
import Playlist from "../../spotifyApi/types/Playlist"
import playMusic from "../../spotifyApi/requests/play"
import pause from "../../spotifyApi/requests/pause"

/**
 *  Classe abstrata base para player de músicas de uma playlist. Para criar um novo tipo de player,
 *  o novo player deve herdar dessa classe.
 */
export default abstract class MusicPlayer {

    protected musicFullDuration: number
    protected trackURI: string
    protected musicNumber: number
    protected musicPlaytimes: number[]
    protected currentIndex: number
    protected musicPlaytime: number
    protected timeoutId: number | undefined
    
    /**
     * 
     *  @param playlist - Playlist em que a música será tocada
     *  
     *  @param playlistId - ID da playlist em que a música será tocada
     *  
     *  @param musicNumber - posição da música que será tocada. **Importante:** a posição da música começa a partir de 0, 
     *  então, por exemplo, musicPos = 1 tocará a segunda música da playlist
     *  
     *  @param musicPlaytime - duração de tempo que será tocada a música, em cada chamada do método **play**. O tempo deve ser
     *  informado em **segundos (s)** 
     *  
     */
    public constructor(playlist: Playlist, musicNumber: number, musicPlaytime: number) {
        this.musicNumber = musicNumber
        this.currentIndex = 0
        this.musicPlaytimes = []
        this.musicFullDuration = playlist.tracks.items[this.musicNumber].track.duration_ms
        this.trackURI = playlist.tracks.items[this.musicNumber].track.uri
        this.musicPlaytime = musicPlaytime

        this.constructPlaytimes()
    }

    /**
     *  Método responsável por selecionar a sequência de tempos em que a música será tocada
     */
    protected abstract constructPlaytimes(): void

    /**
     *  Toca o próximo trecho da música
     */
    public async play() {
        if (!this.finished) {
            let duration = this.musicPlaytime
            if (this.musicPlaytimes[this.currentIndex] + duration * 1000 > this.musicFullDuration) {
                // Caso o playtime esteja próximo do final, pode ser que a duration do play ultrapasse o fim da música
                // Para que não comece outra música, é necessário limitar a duração de play
                duration = (this.musicFullDuration - this.musicPlaytimes[this.currentIndex]) / 1000 - 0.01
            }

            this.timeoutId = await playMusic(duration, this.trackURI, this.musicPlaytimes[this.currentIndex], true)

            this.currentIndex += 1
        }
    }
    
    /**
     *  Para de tocar a musica antecipadamente (caso ela esteja tocando)
     */
    public pause() {
        clearTimeout(this.timeoutId)
        pause(true)
    }

    /**
     *  Verdadeiro se toda a música já foi tocada, caso contrário é falso
     */
    public get finished(): boolean {
        return this.currentIndex >= this.musicPlaytimes.length
    }

    public abstract close(): void
}
