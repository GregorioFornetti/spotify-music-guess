import CopyRight from "./CopyRight"
import ExternalUrls from "./ExternalUrls"
import SpotifyImage from "./SpotifyImage"


export default interface Show {
    /** A list of the countries in which the show can be played, identified by their [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
    available_markets: string[],

    /** The copyright statements of the show. */
    copyrights: CopyRight[],

    /** A description of the show. HTML tags are stripped away from this field, use html_description field in case HTML tags are needed. */
    description: string,

    /** A description of the show. This field may contain HTML tags. */
    html_description: string,

    /** Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown). */
    explicit: boolean,

    /** External URLs for this show. */
    external_urls: ExternalUrls,

    /** A link to the Web API endpoint providing full details of the show. */
    href: string,

    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the show. */
    id: string,

    /** The cover art for the show in various sizes, widest first. */
    images: SpotifyImage[],

    /** True if all of the show’s episodes are hosted outside of Spotify’s CDN. This field might be null in some cases. */
    is_externally_hosted: boolean|null,

    /** A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. */
    languages: string[],

    /** The media type of the show. */
    media_type: string,

    /** The name of the show. */
    name: string,

    /** The publisher of the show. */
    publisher: string,

    /** The object type. */
    type: "show",

    /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the show. */
    uri: string,

    /** The total number of episodes in the show. */
    total_episodes: number
}