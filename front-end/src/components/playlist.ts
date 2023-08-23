import Episode from "../spotifyApi/types/Episode";
import Playlist from "../spotifyApi/types/Playlist"
import Track from "../spotifyApi/types/Track";
import { PlaylistTrackObject } from "../spotifyApi/types/Playlist";
import { filterByMusicArtistAlbum } from "../utils/filters";

interface PlaylistOptions {
    [key: string]: {
        name: string,
        value: string,
        input: HTMLInputElement
    }
}


export default function createPlaylistElement(playlist: Playlist, onMusicSelect?: (music: Track | Episode) => void, onDoubleMusicSelect?: (music: Track | Episode) => void): HTMLElement {
    
    const playlistContainer = document.createElement('div');
    playlistContainer.className = 'playlist-container'

    const playlistTable = document.createElement('table')
    playlistTable.className = 'playlist-table'


    const playlistHead = document.createElement('thead')
    playlistHead.className = 'playlist-head'

    const playlistHeadTitles = document.createElement('tr')
    playlistHeadTitles.className = 'desktop'
    playlistHeadTitles.innerHTML = `
        <th></th>
        <th>Nome</th>
        <th>Artista</th>
        <th>Álbum</th>
    `
    playlistHead.appendChild(playlistHeadTitles)


    const playlistHeadDesktopInputs = document.createElement('tr')
    playlistHeadDesktopInputs.className = 'desktop'

    const playlistNameInputData = document.createElement('td')
    const playlistNameInput = document.createElement('input');
    playlistNameInput.placeholder = 'Nome';
    playlistNameInputData.appendChild(playlistNameInput)

    const playlistArtistInputData = document.createElement('td')
    const playlistArtistInput = document.createElement('input');
    playlistArtistInput.placeholder = 'Artista';
    playlistArtistInputData.appendChild(playlistArtistInput)

    const playlistAlbumInputData = document.createElement('td')
    const playlistAlbumInput = document.createElement('input');
    playlistAlbumInput.placeholder = 'Álbum';
    playlistAlbumInputData.appendChild(playlistAlbumInput)

    playlistHeadDesktopInputs.appendChild(document.createElement('td'))
    playlistHeadDesktopInputs.appendChild(playlistNameInputData)
    playlistHeadDesktopInputs.appendChild(playlistArtistInputData)
    playlistHeadDesktopInputs.appendChild(playlistAlbumInputData)
    playlistHead.appendChild(playlistHeadDesktopInputs)


    const playlistHeadMobileTr = document.createElement('tr')
    playlistHeadMobileTr.className = 'mobile'

    const playlistMobileData = document.createElement('td')

    const playlistMobileInputContainer = document.createElement('div')
    playlistMobileInputContainer.className = 'input-group mb-3'

    const dropdownBtn = document.createElement('button')
    dropdownBtn.className = 'playlist-dropdown-btn btn btn-outline-secondary dropdown-toggle'
    dropdownBtn.dataset.bsToggle = "dropdown"
    dropdownBtn.ariaExpanded = "false"
    dropdownBtn.innerHTML = 'Nome'

    const dropdownMenu = document.createElement('ul')
    dropdownMenu.className = 'dropdown-menu'

    const nameListItem = document.createElement('li')
    const playlistDropdownNameOption = document.createElement('a')
    playlistDropdownNameOption.className = 'playlist-dropdown-item dropdown-item'
    playlistDropdownNameOption.innerHTML = 'Nome'
    nameListItem.appendChild(playlistDropdownNameOption)

    const artistListItem = document.createElement('li')
    const playlistDropdownArtistOption = document.createElement('a')
    playlistDropdownArtistOption.className = 'playlist-dropdown-item dropdown-item'
    playlistDropdownArtistOption.innerHTML = 'Artista'
    artistListItem.appendChild(playlistDropdownArtistOption)

    const albumListItem = document.createElement('li')
    const playlistDropdownAlbumOption = document.createElement('a')
    playlistDropdownAlbumOption.className = 'playlist-dropdown-item dropdown-item'
    playlistDropdownAlbumOption.innerHTML = 'Álbum'
    albumListItem.appendChild(playlistDropdownAlbumOption)

    dropdownMenu.appendChild(nameListItem)
    dropdownMenu.appendChild(artistListItem)
    dropdownMenu.appendChild(albumListItem)

    const playlistGeneralInput = document.createElement('input')
    playlistGeneralInput.placeholder = 'Filtro'

    playlistMobileInputContainer.appendChild(dropdownBtn)
    playlistMobileInputContainer.appendChild(dropdownMenu)
    playlistMobileInputContainer.appendChild(playlistGeneralInput)

    playlistMobileData.appendChild(playlistMobileInputContainer)

    playlistHeadMobileTr.appendChild(playlistMobileData)

    playlistHead.appendChild(playlistHeadMobileTr)


    const playlistBody = document.createElement('tbody')
    playlistBody.className = 'playlist-body'

    
    let selectedMusic: Track | Episode | null;
    let selectedMusicElement: HTMLElement | null = null;
        
    // Essa função vai ser chamada para criar as músicas que devem ser mostradas
    // Isso vai ser feito na criação do componente e toda vez que for escrito em algum input
    const createMusics = ( musics: PlaylistTrackObject[] ) => {
        for (let item of musics) {
            let musicItem = createMusicElement(item.track);

            if (item.track === selectedMusic) {
                musicItem.classList.add('selected');
                selectedMusicElement = musicItem;
            }
    
            if (onMusicSelect) {
                musicItem.classList.add('clickable')
                musicItem.addEventListener('click', () => {
                    onMusicSelect(item.track);
                    if (selectedMusic === item.track) {
                        if (onDoubleMusicSelect) {
                            onDoubleMusicSelect(item.track)
                        }
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

            playlistBody.appendChild(musicItem);
        }
    }

    let selectedOption = 'name'
    const options: PlaylistOptions = {
        name: {
          name: "Nome",
          value: '',
          input: playlistNameInput
        },
        artist: {
          name: "Artista",
          value: '',
          input: playlistArtistInput
        },
        album: {
          name: "Album",
          value: '',
          input: playlistAlbumInput
        }
      }

    const createFilteredMusics = () => {
        playlistBody.innerHTML = '';
        createMusics(filterByMusicArtistAlbum(options['name'].value, options['artist'].value, options['album'].value, playlist.tracks.items));
    }

    // Input do modo mobile, depende do que for selecionado no dropdown
    const onGenericPlaylistInput = () => {
        options[selectedOption]['value'] = playlistGeneralInput.value
        options[selectedOption]['input'].value = playlistGeneralInput.value
        createFilteredMusics()
    }

    // Inputs especificos, são inputs separados para cada tipo de busca, para modo desktop
    const onSpecificPlaylistInput = (inputName: string) => {
        const newValue = options[inputName].input.value
        options[inputName]['value'] = newValue
        if (inputName === selectedOption) {
            playlistGeneralInput.value = newValue
        }
        createFilteredMusics()
    }

    const onOptionSelect = (optionName: string) => {
        selectedOption = optionName
        dropdownBtn.innerHTML = options[optionName]['name']
        playlistGeneralInput.value = options[optionName]['value']
    }

    createMusics(playlist.tracks.items);

    playlistDropdownNameOption.addEventListener('click', () => { onOptionSelect('name') })
    playlistDropdownArtistOption.addEventListener('click', () => { onOptionSelect('artist') })
    playlistDropdownAlbumOption.addEventListener('click', () => { onOptionSelect('album') })

    playlistNameInput.addEventListener('input', () => { onSpecificPlaylistInput('name') });
    playlistArtistInput.addEventListener('input', () => { onSpecificPlaylistInput('artist') });
    playlistAlbumInput.addEventListener('input', () => { onSpecificPlaylistInput('album') });

    playlistGeneralInput.addEventListener('input', onGenericPlaylistInput)

    playlistTable.appendChild(playlistHead)
    playlistTable.appendChild(playlistBody)

    playlistContainer.appendChild(playlistTable);
    
    return playlistContainer
}


/**
 *  Cria um elemento de música, para mostar uma música/episodio dentro de uma tabela (playlist).
 * 
 *  @param {Track|Episode} music - Objeto contendo todas informações necessárias para mostrar a música ou episódio. Utiliza as informações do SpotifyAPI
 * 
 *  @returns Um elemento HTML que pode ser adicionado a uma tabela.
 *  
 */
function createMusicElement(music: Track|Episode) {
    const musicElement = document.createElement('tr')

    const musicImageData = document.createElement('td')
    musicImageData.classList.add('album-img')
    const musicImage = document.createElement('img')
    musicImage.classList.add('playlist-img')

    const musicNameData = document.createElement('td')
    musicNameData.classList.add('name')
    const musicName = document.createElement('span')
    musicName.innerText = music.name

    const musicArtistData = document.createElement('td')
    musicArtistData.classList.add('artist')
    const musicArtist = document.createElement('span')

    const musicAlbumData = document.createElement('td')
    musicAlbumData.classList.add('album')
    const musicAlbum = document.createElement('span')

    if (music.type === 'track') {
        if (music.album.images.length !== 0) {
            musicImage.setAttribute('src', music.album.images[0].url)
        }
        musicArtist.innerText = music.artists[0].name
        musicAlbum.innerText = music.album.name
    } else if (music.type === 'episode') {
        if (music.images.length !== 0) {
            musicImage.setAttribute('src', music.images[0].url)
        }
        musicArtist.innerText = music.show.name
        musicAlbum.innerText = music.show.publisher
    }

    musicImageData.appendChild(musicImage)
    musicNameData.appendChild(musicName)
    musicArtistData.appendChild(musicArtist)
    musicAlbumData.appendChild(musicAlbum)

    musicElement.appendChild(musicImageData)
    musicElement.appendChild(musicNameData)
    musicElement.appendChild(musicArtistData)
    musicElement.appendChild(musicAlbumData)

    return musicElement
}