import Playlist from "./Playlist";

export default interface ExtendedPlaylist extends Playlist {
    playableIndexes: number[]
}