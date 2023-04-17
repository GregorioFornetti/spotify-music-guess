
const idRegexAnyPlace = "([A-Za-z0-9]{22})"
const idRegex = new RegExp(`^${idRegexAnyPlace}$`)
const uriRegex = new RegExp(`^spotify:playlist:${idRegexAnyPlace}$`)
const urlRegex = new RegExp(`^https:\/\/open.spotify.com\/playlist\/${idRegexAnyPlace}(\\?si=.*)?$`)


function isSpotifyUri(uri: string): boolean {
    return uriRegex.test(uri)
}

function isSpotifyUrl(url: string): boolean {
    return urlRegex.test(url)
}

function isSpotifyId(id: string): boolean {
    return idRegex.test(id)
}


function getSpotifyIdFromUri(uri: string): string {
    return uri.match(uriRegex)![1]
}

function getSpotifyIdFromUrl(url: string): string {
    return url.match(urlRegex)![1]
}


export default function getSpotifyId(userPlaylist: string): string {
    userPlaylist = userPlaylist.trim()
    
    if (isSpotifyUri(userPlaylist)) {
        return getSpotifyIdFromUri(userPlaylist)
    } else if (isSpotifyUrl(userPlaylist)) {
        return getSpotifyIdFromUrl(userPlaylist)
    } else if (isSpotifyId(userPlaylist)) {
        return userPlaylist
    } else {
        throw new Error("URI, URL ou ID inválido.")
    }
}