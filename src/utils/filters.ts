import { PlaylistTrackObject } from "../spotifyApi/types/Playlist"

/**
 * 
 *  Filtra uma lista de músicas (playlist track) por nome de música.
 *  
 *  @param {string} musicName - nome da música que será buscada. Apenas as músicas que iniciarem iniciando com esse nome serão retornadas
 * 
 *  @param {PlaylistTrackObject[]} musics - lista de músicas que serão filtradas
 * 
 *  @returns lista de músicas que possuem o nome começando com o nome fornecido no primeiro param.
 * 
 */
export function filterByMusicName(musicName: string, musics: PlaylistTrackObject[]) {
    return musics.filter((music) => {
        return music.track.name.toLowerCase().includes(musicName.toLowerCase())
    })
}


/**
 * 
 *  Filtra uma lista de músicas (playlist track) por nome do artista/banda.
 *  
 *  @param {string} artistName - nome do artista/banda que será buscada. Apenas as músicas que iniciarem com a banda/artista com esse nome serão retornadas
 * 
 *  @param {PlaylistTrackObject[]} musics - lista de músicas que serão filtradas
 * 
 *  @returns lista de músicas que possuem o nome do artista/banda começando com o nome fornecido no primeiro param.
 * 
 */
export function filterByArtistName(artistName: string, musics: PlaylistTrackObject[]) {
    return musics.filter((music) => {
        if (music.track.type === 'episode') {
            return music.track.show.name.toLowerCase().includes(artistName.toLowerCase())
        } else if (music.track.type === 'track') {
            return music.track.artists[0].name.toLowerCase().includes(artistName.toLowerCase())
        }
        return false
    })
}

/**
 * 
 *  Filtra uma lista de músicas (playlist track) por nome do artista/banda.
 *  
 *  @param {string} musicName - nome da música que será buscada. Apenas as músicas que iniciarem iniciando com esse nome serão retornadas
 * 
 *  @param {string} artistName - nome do artista/banda que será buscada. Apenas as músicas que iniciarem com a banda/artista com esse nome serão retornadas
 * 
 *  @param {PlaylistTrackObject[]} musics - lista de músicas que serão filtradas
 * 
 *  @returns lista de músicas que possuem o nome começando com o nome fornecido no primeiro param. e também possuem o nome de banda/artista com o nome fornecido no segundo param.
 * 
 */
export function filterByMusicAndArtistName(musicName: string, artistName: string, musics: PlaylistTrackObject[]) {
    return filterByMusicName(musicName, filterByArtistName(artistName, musics))
}