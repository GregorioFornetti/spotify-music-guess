
import Playlist from "../../spotifyApi/types/Playlist"
import playMusic from "../../spotifyApi/requests/play"

export default abstract class MusicPlayer {

    protected musicFullDuration: number
    protected playlistId: string
    protected musicNumber: number
    protected musicPlaytimes: number[]
    protected currentIndex: number
    protected musicPlaytime: number
    

    public constructor(playlist: Playlist, playlistId: string, musicNumber: number, musicPlaytime: number) {
        this.musicNumber = musicNumber
        this.currentIndex = 0
        this.musicPlaytimes = []
        this.musicFullDuration = playlist.tracks.items[this.musicNumber].track.duration_ms
        this.playlistId = playlistId
        this.musicPlaytime = musicPlaytime

        this.constructPlaytimes()
    }

    protected abstract constructPlaytimes(): void

    public play(): void {
        if (!this.finished) {
            let duration = this.musicPlaytime
            if (this.musicPlaytimes[this.currentIndex] + duration * 1000 > this.musicFullDuration) {
                // Caso o playtime esteja próximo do final, pode ser que a duration do play ultrapasse o fim da música
                // Para que não comece outra música, é necessário limitar a duração de play
                duration = (this.musicFullDuration - this.musicPlaytimes[this.currentIndex]) / 1000 - 0.01
            }

            playMusic(this.musicNumber, duration, this.playlistId, this.musicPlaytimes[this.currentIndex])

            this.currentIndex += 1
        }
    }

    public get finished(): boolean {
        return this.currentIndex >= this.musicPlaytimes.length
    }
}
