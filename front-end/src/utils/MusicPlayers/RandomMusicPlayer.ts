
import MusicPlayer from "./MusicPlayer"
import shuffle from "../shuffle"

/**
 *  Tocador de músicas em posições aleatórias. Toca a trechos das músicas aleatóriamente, sendo que cada trecho foi gerado
 *  sequencialmente com tempo de duração definido no parâmetro do construtor **musicPlaytime**
 */
export default class RandomMusicPlayer extends MusicPlayer {

    protected constructPlaytimes(): void {
        this.musicPlaytimes.push(0)

        let currPlaytime = this.musicPlaytime * 1000
        while (currPlaytime < this.musicFullDuration) {
            this.musicPlaytimes.push(currPlaytime)
            currPlaytime += this.musicPlaytime * 1000
        }

        this.musicPlaytimes = shuffle(this.musicPlaytimes)
    }

    public close(): void {
        
    }
}
