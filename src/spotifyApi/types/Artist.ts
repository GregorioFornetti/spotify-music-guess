import SimplifiedArtist from "./SimplifiedArtist"
import Followers from "./Followers"
import SpotifyImage from "./SpotifyImage"


export default interface Artist extends SimplifiedArtist {
    /** Information about the followers of the artist. */
    followers: Followers,

    /** A list of the genres the artist is associated with. */
    genres: string[],

    /** Images of the artist in various sizes, widest first. */
    images: SpotifyImage[],

    /** The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. */
    popularity: number
}

