
import MusicPlayer from "./MusicPlayer"
import shuffle from "../shuffle"

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
}
