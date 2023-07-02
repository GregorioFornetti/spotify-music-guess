import Episode from "../spotifyApi/types/Episode";
import Playlist from "../spotifyApi/types/Playlist"
import Track from "../spotifyApi/types/Track";
import createMusicElement from "./music"
import { PlaylistTrackObject } from "../spotifyApi/types/Playlist";
import { filterByMusicArtistAlbum } from "../utils/filters";


export default function createPlaylistElement(playlist: Playlist, funkao?: (music: Track | Episode) => void): HTMLElement {
    
    const musicsContainer = document.createElement('div');

    const playlistContainer = document.createElement('div')
    const playlistMusic = document.createElement('ul');
    let selectedMusicElement: HTMLElement | null = null;

    const inputName = document.createElement('input');
    inputName.placeholder = 'Música';
    const inputArtista = document.createElement('input');
    inputArtista.placeholder = 'Artista';
    const inputAlbum = document.createElement('input');
    inputAlbum.placeholder = 'Album';

    playlistContainer.appendChild(inputName);
    playlistContainer.appendChild(inputArtista);
    playlistContainer.appendChild(inputAlbum);

    

    let selectedMusic: Track | Episode | null;
    
    const criarMusicas = ( musics: PlaylistTrackObject[]) => {
        for (let item of musics) {
            let musicContainer = document.createElement('li');
            musicContainer.classList.add('musicContainer');
            let musicItem = createMusicElement(item.track);
            musicItem.classList.add('musicItem');

            if (item.track === selectedMusic) {
                musicItem.classList.add('selected');
                selectedMusicElement = musicItem;
            }

            musicContainer.appendChild(musicItem);
            playlistMusic.appendChild(musicContainer);
    
            if (funkao) {
                musicContainer.addEventListener('click', () => {
                    funkao(item.track);
                    if (selectedMusic === item.track) {
                        console.log("infernoooooo - by carminha");
                        selectedMusicElement?.classList.remove('selected');
                        selectedMusicElement = null;
                        selectedMusic = null;
                        return;
                   }
                    if (selectedMusicElement) {
                        selectedMusicElement.classList.remove('selected');
                    }
                    selectedMusicElement = musicItem;
                    selectedMusic = item.track;
                    selectedMusicElement.classList.add('selected');
    
                })
            }
        }
    } 

    const criarMusicasFiltradas = () => {
        musicsContainer.innerHTML = '';
        playlistMusic.innerHTML = '';
        criarMusicas(filterByMusicArtistAlbum(inputName.value, inputArtista.value, inputAlbum.value, playlist.tracks.items));
        musicsContainer.appendChild(playlistMusic);

    }

    criarMusicas(playlist.tracks.items);
    musicsContainer.appendChild(playlistMusic);
    playlistContainer.appendChild(musicsContainer);

    inputName.addEventListener('input', criarMusicasFiltradas);
    inputArtista.addEventListener('input', criarMusicasFiltradas);
    inputAlbum.addEventListener('input', criarMusicasFiltradas);

    
    return playlistContainer
}


