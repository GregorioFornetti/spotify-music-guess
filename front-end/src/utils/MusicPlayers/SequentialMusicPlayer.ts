
import MusicPlayer from "./MusicPlayer";

/**
 *  Tocador de músicas de forma sequencial. Toca os trechos das músicas sequencialmente, sendo que cada trecho tem tempo de duração definido no *  parâmetro do construtor **musicPlaytime**
 */
export default class SequentialMusicPlayer extends MusicPlayer {
    protected constructPlaytimes(): void {
        this.musicPlaytimes.push(0)
        
        let currPlaytime = this.musicPlaytime * 1000
        while (currPlaytime < this.musicFullDuration) {
            this.musicPlaytimes.push(currPlaytime)
            currPlaytime += this.musicPlaytime * 1000
        }
    }

    public close(): void {
        
    }
}