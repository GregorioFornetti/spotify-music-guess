import Album from './Album'
import Artist from './Artist'
import ExternalIds from './ExternalIds'
import ExternalUrls from './ExternalUrls'
import Restriction from './Restriction'


export default interface Track {
    /** The album on which the track appears. The album object includes a link in href to full information about the album. */
    album: Album,

    /** The artists who performed the track. Each artist object includes a link in href to more detailed information about the artist. */
    artists: Artist[],

    /** A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
    available_markets: string[],

    /** The disc number (usually 1 unless the album consists of more than one disc). */
    disc_number: number,

    /** The track length in milliseconds. */
    duration_ms: number,

    /** Whether or not the track has explicit lyrics ( true = yes it does; false = no it does not OR unknown). */
    explicit: boolean,

    /** Known external IDs for the track. */
    external_ids: ExternalIds,

    /** Known external URLs for this track. */
    external_urls: ExternalUrls,

    /** A link to the Web API endpoint providing full details of the track. */
    href: string,

    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the track. */
    id: string,

    /** Part of the response when [Track Relinking](https://developer.spotify.com/documentation/web-api/concepts/track-relinking) is applied. If true, the track is playable in the given market. Otherwise false. */
    is_playable: boolean,
    
    /** Included in the response when a content restriction is applied */
    restrictions: Restriction,

    /** The name of the track */
    name: string,

    /** The popularity of the track. The value will be between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are. Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. Note that the popularity value may lag actual popularity by a few days: the value is not updated in real time. */
    popularity: number,

    /** A link to a 30 second preview (MP3 format) of the track. */
    preview_url: string|null,

    /** The number of the track. If an album has several discs, the track number is the number on the specified disc. */
    track_number: number,

    /** The object type */
    type: 'track',

    /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the track. */
    uri: string,

    /** Whether or not the track is from a local file. */
    is_local: boolean
}