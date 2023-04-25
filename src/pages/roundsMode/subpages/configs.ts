import toggleToSubpage from "../subpageToggler"
import { initShowSongGuess } from "./songGuess"
import GameInfo from "../GameInfo"

export default function initConfigSubpage() {
    const playlistMusicsQnt = GameInfo.playlist.tracks.items.length

    const inputRoundsNumber = document.getElementById('configs-rounds-rounds-number') as HTMLElement
    inputRoundsNumber.setAttribute('max', playlistMusicsQnt.toString())

    const inputMusicsQnt = document.getElementById('configs-rounds-music-qnt') as HTMLElement
    inputMusicsQnt.setAttribute('max', playlistMusicsQnt.toString())
    inputMusicsQnt.setAttribute('value', playlistMusicsQnt.toString())

    toggleToSubpage('configs-rounds-subpage')
}

document.addEventListener('DOMContentLoaded', () => {
    const configForm = document.getElementById('configs-rounds-form') as HTMLFormElement

    configForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const formValues = new FormData(configForm)
        GameInfo.totalRounds = Number(formValues.get('rounds-number'))
        GameInfo.musicPos = formValues.get('music-pos') as typeof GameInfo.musicPos
        GameInfo.musicPlaytime = Number(formValues.get('music-play-time'))
        GameInfo.musicsQnt = Number(formValues.get('music-qnt'))
        if (formValues.get('extra-tries') == 'on') {
            GameInfo.extraTries = true
        } else {
            GameInfo.extraTries = false
        }

        configForm.reset()

        initShowSongGuess()
    })
})