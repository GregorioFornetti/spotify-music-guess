
/**
 *  Uma classe para manipular e coletar os ids das playlists que o usuário já jogou.
 */
export default class PlayAgainPlaylistsIds {
    private static storageName = 'play_again_playlists_ids'
    private static ids: string[] = JSON.parse(localStorage.getItem(this.storageName) || '[]')

    /**
     *  
     *   Salva um novo id de playlist
     * 
     *   @param playlistId - Id da playlist que será salva
     *  
     *   @returns Retorna -1 caso o id já exista, caso contrário retorna o índice em que o id estava salvo
     *  
     */
    static savePlaylistId(playlistId: string): number {
        const indexPlaylistId =  this.ids.indexOf(playlistId)
        if (indexPlaylistId !== -1) {
            this.ids.splice(indexPlaylistId, 1)
        }
        console.log(playlistId)
        this.ids.unshift(playlistId)
        console.log(this.ids)
        localStorage.setItem(this.storageName, JSON.stringify(this.ids))

        return indexPlaylistId
    }

    /** 
     * 
     *  Retorna os ids das playlists que o usuário já jogou
     * 
     *  @returns Um array contendo os ids das playlists que o usuário já jogou
     *  
    */
    static getPlaylistsIds(): string[] {
        return this.ids
    }
}