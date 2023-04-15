import ExternalUrls from "./ExternalUrls"
import SpotifyImage from "./SpotifyImage"
import Restriction from "./Restriction"
import CopyRight from "./CopyRight"
import ExternalIds from "./ExternalIds"
import SimplifiedArtist from "./SimplifiedArtist"

export default interface Album {
    /** The type of the album. */
    album_type: "album"|"single"|"compilation",

    /** The number of tracks in the album. */
    total_tracks: number,

    /** The markets in which the album is available: I[SO 3166-1 alpha-2 country codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). NOTE: an album is considered available in a market when at least 1 of its tracks is available in that market. */
    available_markets: string[],

    /** Known external URLs for this album. */
    external_urls: ExternalUrls,

    /** A link to the Web API endpoint providing full details of the album. */
    href: string,

    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the album. */
    id: string,

    /** The cover art for the album in various sizes, widest first. */
    images: SpotifyImage[],

    /** The name of the album. In case of an album takedown, the value may be an empty string. */
    name: string,

    /** The date the album was first released. */
    release_date: string,

    /** The precision with which release_date value is known */
    release_date_precision: "year"|"month"|"day",

    /** Included in the response when a content restriction is applied. */
    restrictions: Restriction|null,

    /** The object type */
    type: "album",

    /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the album. */
    uri: string

    /** The copyright statements of the album. */
    copy_rights: CopyRight[]|null,

    /** Known external IDs for the album. */
    external_ids: ExternalIds|null,

    /** A list of the genres the album is associated with. If not yet classified, the array is empty. */
    genres: string[]|null,

    /** The label for the album. */
    label: string|null,

    /** The popularity of the album. The value will be between 0 and 100, with 100 being the most popular. */
    popularity: number|null,

    /** The field is present when getting an artist's albums. Compare to album_type this field represents relationship between the artist and the album. */
    album_group: "album"|"single"|"compilation"|"appears_on"|null,

    /** The artists of the album. Each artist object includes a link in href to more detailed information about the artist. */
    artists: SimplifiedArtist[]
}
