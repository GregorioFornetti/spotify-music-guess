import { PlaylistTrackObject } from "../spotifyApi/types/Playlist"

export function filterByMusicName(musicName: string, musics: PlaylistTrackObject[]) {
    return musics.filter((music) => {
        return music.track.name.toLowerCase().startsWith(musicName.toLowerCase())
    })
}

export function filterByArtistName(artistName: string, musics: PlaylistTrackObject[]) {
    return musics.filter((music) => {
        if (music.track.type === 'episode') {
            return music.track.show.name.toLowerCase().startsWith(artistName.toLowerCase())
        } else if (music.track.type === 'track') {
            return music.track.artists[0].name.toLowerCase().startsWith(artistName.toLowerCase())
        }
        return false
    })
}

export function filterByMusicAndArtistName(musicName: string, artistName: string, musics: PlaylistTrackObject[]) {
    return filterByMusicName(musicName, filterByArtistName(artistName, musics))
}