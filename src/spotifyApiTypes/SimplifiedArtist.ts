import ExternalUrls from "./ExternalUrls";


export default interface SimplifiedArtist {
    /** Known external URLs for this artist. */
    external_urls: ExternalUrls,

    /** A link to the Web API endpoint providing full details of the artist. */
    href: string,

    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the artist. */
    id: string,

    /** The name of the artist. */
    name: string,

    /** The object type */
    type: "artist",

    /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the artist. */
    uri: string
}