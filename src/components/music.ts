import Track from "../spotifyApi/types/Track"
import Episode from "../spotifyApi/types/Episode"

export default function createMusicElement(music: Track|Episode): HTMLElement {
    const musicElement = document.createElement('div')
    musicElement.classList.add('music')

    const musicImage = document.createElement('img')
    musicImage.classList.add('music-image')

    const musicName = document.createElement('p')
    musicName.classList.add('music-name')
    musicName.innerText = music.name

    const musicArtist = document.createElement('p')
    musicArtist.classList.add('music-artist')


    if (music.type === 'track') {
        if (music.album.images.length !== 0) {
            musicImage.setAttribute('src', music.album.images[0].url)
        }
        musicArtist.innerText = music.artists[0].name

    } else if (music.type === 'episode') {
        if (music.images.length !== 0) {
            musicImage.setAttribute('src', music.images[0].url)
        }
        musicArtist.innerText = music.show.name
    }

    musicElement.appendChild(musicImage)
    musicElement.appendChild(musicName)
    musicElement.appendChild(musicArtist)

    return musicElement
}