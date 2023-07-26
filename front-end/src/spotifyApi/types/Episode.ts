import ExternalUrls from "./ExternalUrls"
import SpotifyImage from "./SpotifyImage"
import ResumePoint from "./ResumePoint"
import Restriction from "./Restriction"
import Show from "./Show"


export default interface Episode {
    /** A URL to a 30 second preview (MP3 format) of the episode. null if not available. */
    audio_preview_url: string|null,

    /** A description of the episode. HTML tags are stripped away from this field, use html_description field in case HTML tags are needed. */
    description: string,

    /** A description of the episode. This field may contain HTML tags. */
    html_description: string,

    /** The episode length in milliseconds. */
    duration_ms: number,

    /** Whether or not the episode has explicit content ( true = yes it does; false = no it does not OR unknown). */
    explicit: boolean,

    /** External URLs for this episode. */
    external_urls: ExternalUrls,

    /** A link to the Web API endpoint providing full details of the episode. */
    href: string,

    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the episode. */
    id: string,

    /** The cover art for the episode in various sizes, widest first. */
    images: SpotifyImage[],

    /** True if the episode is hosted outside of Spotify’s CDN. */
    is_externally_hosted: boolean,

    /** True if the episode is playable in the given market. Otherwise false. */
    is_playable: boolean,

    /** The language used in the episode, identified by a [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated and might be removed in the future. Please use the languages field instead. */
    language: string,

    /** A list of the languages used in the episode, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. */
    languages: string[],

    /** The name of the episode. */
    name: string,

    /** The date the episode was first released */
    release_date: string,

    /** The precision with which release_date value is known */
    release_date_precision: "year" | "month" | "day",

    /** The user’s most recent position in the episode. Set if the supplied access token is a user token and has the scope user-read-playback-position. */
    resume_point: ResumePoint,

    /** The object type */
    type: "episode",

    /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the episode. */
    uri: string,

    /** Included in the response when a content restriction is applied. */
    restrictions: Restriction,

    /** The show on which the episode belongs. */
    show: Show
}