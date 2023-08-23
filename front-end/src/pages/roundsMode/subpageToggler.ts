import { toggleToSubpage } from "../../utils/pageToggler"

const subpagesDisplay = {
    "configs-rounds-subpage": "block",
    "song-guess-rounds-subpage": "block",
    "song-result-rounds-subpage": "flex",
    "final-result-rounds-subpage": "block"
}

export default function toggleToSubpageRoundsMode(subPageId: keyof typeof subpagesDisplay) {
    toggleToSubpage('rounds-mode-game-page', subPageId)
}