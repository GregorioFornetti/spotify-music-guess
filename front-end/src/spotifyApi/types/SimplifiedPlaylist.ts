import ExternalUrls from "./ExternalUrls"
import SpotifyImage from "./SpotifyImage"
import Owner from "./Owner"

export default interface SimplifiedPlaylist {
    /** true if the owner allows other users to modify the playlist. */
    collaborative: boolean,

    /** The playlist description. Only returned for modified, verified playlists, otherwise null. */
    description: string|null,

    /** Known external URLs for this playlist. */
    external_urls: ExternalUrls,

    /** A link to the Web API endpoint providing full details of the playlist. */
    href: string,

    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the playlist. */
    id: string,

    /** Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](https://developer.spotify.com/documentation/web-api/concepts/playlists). Note: If returned, the source URL for the image (url) is temporary and will expire in less than a day. */
    images: SpotifyImage[],

    /** The name of the playlist. */
    name: string,

    /** The user who owns the playlist */
    owner: Owner,

    /** The playlist’s public/private status: true the playlist is public, false the playlist is private, null the playlist status is not relevant. For more about public/private status, see [Working with Playlists](https://developer.spotify.com/documentation/web-api/concepts/playlists). */
    public: boolean|null,

    /** The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version */
    snapshot_id: string,

    /** A collection containing a link (href) to the Web API endpoint where full details of the playlist’s tracks can be retrieved, along with the total number of tracks in the playlist. */
    tracks: {
        /** A link to the Web API endpoint where full details of the playlist’s tracks can be retrieved. */
        href: string,

        /** The total number of tracks in the playlist. */
        total: number
    },

    /** The object type */
    type: "playlist",

    /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the playlist. */
    uri: string
}