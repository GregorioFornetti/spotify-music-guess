import ExternalUrls from "./ExternalUrls"
import Followers from "./Followers"


export default interface Owner {
   /** Known public external URLs for the user. */
    external_urls: ExternalUrls,

    /** Information about the followers of the user. */
    followers: Followers,

    /** A link to the Web API endpoint for the user. */
    href: string,

    /** The [Spotify user ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the user. */
    id: string,

    /** The object type */
    type: "user",

    /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the user. */
    uri: string,

    /** The user’s display name. */
    display_name: string|null
}