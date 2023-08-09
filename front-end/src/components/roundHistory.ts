import { RoundInfo } from "../pages/roundsMode/GameInfo"
import Episode from "../spotifyApi/types/Episode"
import Track from "../spotifyApi/types/Track"
import formatTime from "../utils/formatTime"


function createMusicElement(music: Track | Episode) {
    const musicElement = document.createElement('div')
    musicElement.classList.add('music-round-history')

    const musicImage = document.createElement('img')
    musicImage.classList.add('music-image-round-history')

    const musicName = document.createElement('p')
    musicName.classList.add('music-name-round-history')
    musicName.innerText = music.name

    const musicArtist = document.createElement('p')
    musicArtist.classList.add('music-artist-round-history')


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

export default function createRoundHistoryElement(roundInfo: RoundInfo) {
    const roundHistoryElement = document.createElement('div')

    roundHistoryElement.classList.add('carousel-item')
    

    roundHistoryElement.appendChild(createMusicElement(roundInfo.guessedMusic))
    roundHistoryElement.appendChild(createMusicElement(roundInfo.correctMusic))

    const timeSpentElement = document.createElement('p')
    timeSpentElement.innerText = `Tempo gasto: ${formatTime(roundInfo.timeSpent)}`
    roundHistoryElement.appendChild(timeSpentElement)

    // if (roundInfo.extraTriesCount) {
    //     const extraTriesCountElement = document.createElement('p')
    //     extraTriesCountElement.innerText = `Tentativas extras utilizadas: ${roundInfo.extraTriesCount}`
    //     roundHistoryElement.appendChild(extraTriesCountElement)
    // }

    return roundHistoryElement
}