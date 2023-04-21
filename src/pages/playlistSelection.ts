/*
    Página home, na qual usuário pode escolher a playlist que vai jogar
*/
import getSpotifyId from "../utils/getSpotifyID"
import showPlaylistInfo from "./playlistInfo"
import getPlaylist from "../spotifyApi/requests/getPlaylist"



document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("playlist-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const playlist_input_str = (<HTMLInputElement>document.getElementById("playlist-input")).value;
        try {
            const playlistId = getSpotifyId(playlist_input_str)
            const playlist = await getPlaylist(playlistId)
            showPlaylistInfo(playlist, playlistId)
        } catch (error) {
            console.log(error)
        }
    })


})