
import Playlist from "../../spotifyApi/types/Playlist";
import MusicPlayer from "./MusicPlayer";

/**
 *  Tocador de músicas de forma sequencial. Nesse caso, será utilizado a propriedade preview para tocar as músicas,
 *  para que não seja necessário a utilização do login para tocar as músicas
 */
export default class PreviewMusicPlayer extends MusicPlayer {

    protected playerElement: HTMLAudioElement

    public constructor(playlist: Playlist, musicNumber: number, musicPlaytime: number) {
        super(playlist, musicNumber, musicPlaytime)
        this.playerElement = this.createPlayerElement(playlist)
        this.musicFullDuration = 30000  // O preview tem no máximo 30 segundos
    }

    protected createPlayerElement(playlist: Playlist): HTMLAudioElement {
        const music = playlist.tracks.items[this.musicNumber].track
        const playerElement = document.createElement('audio')
        playerElement.style.display = 'none'

        const audioSource = document.createElement('source')
        if (music.type === 'track') {
            audioSource.src = music.preview_url as string
        } else if (music.type === 'episode') {
            audioSource.src = music.audio_preview_url as string
        }
        audioSource.type = 'audio/mpeg'
        playerElement.appendChild(audioSource)

        document.body.appendChild(playerElement)

        return playerElement
    }

    protected constructPlaytimes(): void {
        this.musicPlaytimes.push(0)
        
        let currPlaytime = this.musicPlaytime * 1000
        while (currPlaytime < this.musicFullDuration) {
            this.musicPlaytimes.push(currPlaytime)
            currPlaytime += this.musicPlaytime * 1000
        }
    }

    public async play() {
        if (!this.finished) {
            this.playerElement.play()
            setTimeout(() => {
                this.playerElement.pause()
            }, this.musicPlaytime * 1000)
        }
    }
    
    public pause() {
        this.playerElement.pause()
    }

    public close() {
        this.playerElement.remove()
    }
}