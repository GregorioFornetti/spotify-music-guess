import { RoundInfo } from "../pages/roundsMode/GameInfo"
import Episode from "../spotifyApi/types/Episode"
import Track from "../spotifyApi/types/Track"
import formatTime from "../utils/formatTime"

function createMusicElement(music: Track | Episode, isChoice: boolean) {
    const musicElement = document.createElement('div')
    //musicElement.classList.add('music-round-item')

    const musicType = document.createElement('p')
    musicType.classList.add('music-round-history-type')
    if (isChoice === true) {
        musicType.innerText = 'Música escolhida'
    } else {
        musicType.innerText = 'Música sorteada'
    }

    const musicImage = document.createElement('img')
    musicImage.classList.add('img-fluid')
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

    musicElement.appendChild(musicType)
    musicElement.appendChild(musicImage)
    musicElement.appendChild(musicName)
    musicElement.appendChild(musicArtist)

    return musicElement
}

export default function createRoundHistoryElement(roundInfo: RoundInfo) {
    // Cria a div 'carousel-item rounds-mode-history rounds-mode-history-(accepted/rejected)'
    const roundHistoryElement = document.createElement('div')
    roundHistoryElement.classList.add('carousel-item')
    roundHistoryElement.classList.add('rounds-mode-history')
    if (roundInfo.guessedMusic.id === roundInfo.correctMusic.id) {
        roundHistoryElement.classList.add('rounds-mode-history-accepted')
    } else {
        roundHistoryElement.classList.add('rounds-mode-history-rejected')
    }
    
    // Cria a div 'timer'
    const timeSpentElement = document.createElement('div')
    timeSpentElement.classList.add('timer')
    timeSpentElement.innerText = `${formatTime(roundInfo.timeSpent)}`

    // Cria a div 'music-round-history'
    const musicElement = document.createElement('div')
    musicElement.classList.add('music-round-history')
    
    // Cria a div 'music-round-history-imag'
    const imageElement = document.createElement('div')
    imageElement.classList.add('music-round-history-image')
    
    // Cria a música escolhida
    const guessedMusicElement = createMusicElement(roundInfo.guessedMusic, true)
    if (roundInfo.guessedMusic.id === roundInfo.correctMusic.id) {
        guessedMusicElement.classList.add('music-round-history-choice-ac')
    } else {
        guessedMusicElement.classList.add('music-round-history-choice-re')
    }
     
    // Cria a música correta
    const correctMusicElement = createMusicElement(roundInfo.correctMusic, false)
    correctMusicElement.classList.add('music-round-history-correct')
    
    // Adiciona os elementos criados
    imageElement.appendChild(correctMusicElement)
    imageElement.appendChild(guessedMusicElement)
    musicElement.appendChild(imageElement)
    roundHistoryElement.appendChild(timeSpentElement)
    roundHistoryElement.appendChild(musicElement)

    // if (roundInfo.extraTriesCount) {
    //     const extraTriesCountElement = document.createElement('p')
    //     extraTriesCountElement.innerText = `Tentativas extras utilizadas: ${roundInfo.extraTriesCount}`
    //     roundHistoryElement.appendChild(extraTriesCountElement)
    // }

    return roundHistoryElement
}