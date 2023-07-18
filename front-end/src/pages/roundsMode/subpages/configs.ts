import toggleToSubpage from "../subpageToggler"
import { initShowSongGuess } from "./songGuess"
import GameInfo from "../GameInfo"
import User from "../../../global/User"
import { PlaylistTrackObject } from "../../../spotifyApi/types/Playlist"

export default function initConfigSubpage() {
    resetForm(document.getElementById('configs-rounds-form') as HTMLFormElement)

    const playlistMusicsQnt = GameInfo.playlist.tracks.items.length

    const inputRoundsNumber = document.getElementById('configs-rounds-rounds-number') as HTMLElement
    inputRoundsNumber.setAttribute('max', playlistMusicsQnt.toString())

    const inputMusicsQnt = document.getElementById('configs-rounds-music-qnt') as HTMLElement
    inputMusicsQnt.setAttribute('max', playlistMusicsQnt.toString())
    inputMusicsQnt.setAttribute('value', playlistMusicsQnt.toString())

    toggleToSubpage('configs-rounds-subpage')
}

function changeMusicsPosInputs(enable: boolean) {
    const musicPosInitInput = document.getElementById('music-pos-init') as HTMLInputElement
    const musicPosRandomInput = document.getElementById('music-pos-random') as HTMLInputElement

    if (enable) {
        // Habilita as opções de posições de musica
        musicPosInitInput.disabled = false
        musicPosInitInput.checked = true
        musicPosRandomInput.disabled = false
    } else {
        // Desabilita as opções de posições de musica
        musicPosInitInput.disabled = true
        musicPosInitInput.checked = false
        musicPosRandomInput.disabled = true
        musicPosRandomInput.checked = false
    }
}

function resetForm(form: HTMLFormElement) {
    const inputPremiumMode = document.getElementById('input-premium') as HTMLInputElement

    form.reset()

    if (User.isLogged) {
        inputPremiumMode.checked = true
        inputPremiumMode.disabled = false
        changeMusicsPosInputs(true)
    } else {
        inputPremiumMode.checked = false
        inputPremiumMode.disabled = true
        changeMusicsPosInputs(false)
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const inputPremiumMode = document.getElementById('input-premium') as HTMLInputElement

    inputPremiumMode.addEventListener('input', () => {
        changeMusicsPosInputs(inputPremiumMode.checked)
    })

    const configForm = document.getElementById('configs-rounds-form') as HTMLFormElement

    configForm.addEventListener('submit', async (event) => {
        event.preventDefault()

        const formValues = new FormData(configForm)
        GameInfo.totalRounds = Number(formValues.get('rounds-number'))
        GameInfo.musicPos = formValues.get('music-pos') as typeof GameInfo.musicPos
        GameInfo.musicPlaytime = Number(formValues.get('music-play-time'))
        GameInfo.musicsQnt = Number(formValues.get('music-qnt'))
        GameInfo.isPremiumMode = formValues.get('premium') === 'on'
        GameInfo.extraTries = formValues.get('extra-tries') === 'on'

        // Essa filtragem não deve ficar aqui, depois, os tipos de jogos (premium ou não) devem ser selecionados antes de mostras as musicas...
        if (!GameInfo.isPremiumMode) {
            // Remove as músicas que não possuem o preview, no caso de jogar sem login
            GameInfo.playlist.tracks.items = GameInfo.playlist.tracks.items.filter((playlistTrack: PlaylistTrackObject) => {
                const music = playlistTrack.track
                if (music.type === 'track') {
                    return music.preview_url !== null
                } else if (music.type === 'episode') {
                    return music.audio_preview_url !== null
                }
                return false
            })
            GameInfo.musicsQnt = Math.min(GameInfo.playlist.tracks.items.length, GameInfo.musicsQnt)
        }

        await initShowSongGuess()

        resetForm(configForm)
    })
})