

export default function createMusicElement(music: any): HTMLElement {
    const musicElement = document.createElement('div')
    musicElement.classList.add('music')

    const musicImage = document.createElement('img')
    musicImage.classList.add('music-image')
    musicImage.setAttribute('src', music.album.images[0].url)

    const musicName = document.createElement('p')
    musicName.classList.add('music-name')
    musicName.innerText = music.name

    const musicArtist = document.createElement('p')
    musicArtist.classList.add('music-artist')
    musicArtist.innerText = music.artists[0].name

    musicElement.appendChild(musicImage)
    musicElement.appendChild(musicName)
    musicElement.appendChild(musicArtist)

    return musicElement
}