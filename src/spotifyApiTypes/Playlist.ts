import ExternalUrls from './ExternalUrls'
import Followers from './Followers'
import SpotifyImage from './SpotifyImage'
import Owner from './Owner'
import Track from './Track'
import Episode from './Episode'


interface PlaylistTrackObject {
    /** The date and time the track or episode was added. Note: some very old playlists may return null in this field. */
    added_at: string|null,

    /** The Spotify user who added the track or episode. Note: some very old playlists may return null in this field. */
    added_by: {
        /** Known public external URLs for this user. */
        external_urls: ExternalUrls,

        /** Information about the followers of this user. */
        followers: Followers,

        /** A link to the Web API endpoint for this user. */
        href: string,

        /** The [Spotify user ID](https://developer.spotify.com/documentation/web-api/concepts/#spotify-uris-and-ids) for this user. */
        id: string,

        /** Known public external URLs for this user. */
        type: "user",

        /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for this user. */
        uri: string
    },

    /** Whether this track or episode is a local file or not. */
    is_local: boolean,

    /** Information about the track or episode. */
    track: Track|Episode
}

export default interface Playlist {
    /** true if the owner allows other users to modify the playlist. */
    collaborative: boolean,
    
    /** The playlist description. Only returned for modified, verified playlists, otherwise null. */
    description: string|null,

    /** Known external URLs for this playlist. */
    external_urls: ExternalUrls,

    /** Information about the followers of the playlist. */
    followers: Followers,

    /** A link to the Web API endpoint providing full details of the playlist. */
    href: string,

    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the playlist. */
    id: string,

    /** Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](https://developer.spotify.com/documentation/web-api/concepts/playlists). Note: If returned, the source URL for the image (url) is temporary and will expire in less than a day. */
    images: SpotifyImage[],

    /** The name of the playlist. */
    name: string

    /** The user who owns the playlist */
    owner: Owner,

    /** The playlist's public/private status: true the playlist is public, false the playlist is private, null the playlist status is not relevant. For more about public/private status, see [Working with Playlists](https://developer.spotify.com/documentation/web-api/concepts/playlists) */
    public: boolean,

    /** The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version */
    snapshot_id: string,

    tracks: {
        /** A link to the Web API endpoint returning the full result of the request */
        href: string,

        /** The maximum number of items in the response (as set in the query or by default). */
        limit: number,

        /** The URL to the next page of items. (null if none) */
        next: string|null,

        /** The offset of the items returned (as set in the query or by default) */
        offset: number,

        /** The URL to the previous page of items. (null if none) */
        previous: string|null,

        /** The total number of items available to return. */
        total: number,

        /** The musics/episodes of the playlist */
        items: PlaylistTrackObject[]
    },
    
    /** The object type */
    type: "playlist",

    /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the playlist. */
    uri: string
}

