
import MusicPlayer from "./MusicPlayer";

export default class SequentialMusicPlayer extends MusicPlayer {

    protected constructPlaytimes(): void {
        this.musicPlaytimes.push(0)
        
        let currPlaytime = this.musicPlaytime * 1000
        while (currPlaytime < this.musicFullDuration) {
            this.musicPlaytimes.push(currPlaytime)
            currPlaytime += this.musicPlaytime * 1000
        }
    }
}