
const id_regex_any_place = "([A-Za-z0-9]{22})"
const id_regex = new RegExp(`^${id_regex_any_place}$`)
const uri_regex = new RegExp(`^spotify:playlist:${id_regex_any_place}$`)
const url_regex = new RegExp(`^https:\/\/open.spotify.com\/playlist\/${id_regex_any_place}(\\?si=.*)?$`)


function is_spotify_uri(uri: string): boolean {
    return uri_regex.test(uri)
}

function is_spotify_url(url: string): boolean {
    return url_regex.test(url)
}

function is_spotify_id(id: string): boolean {
    return id_regex.test(id)
}


function get_spotify_id_from_uri(uri: string): string {
    return uri.match(uri_regex)![1]
}

function get_spotify_id_from_url(url: string): string {
    return url.match(url_regex)![1]
}


export default function get_spotify_id(user_playlist: string): string {
    user_playlist = user_playlist.trim()
    
    if (is_spotify_uri(user_playlist)) {
        return get_spotify_id_from_uri(user_playlist)
    } else if (is_spotify_url(user_playlist)) {
        return get_spotify_id_from_url(user_playlist)
    } else if (is_spotify_id(user_playlist)) {
        return user_playlist
    } else {
        throw new Error("URI, URL ou ID inválido.")
    }
}