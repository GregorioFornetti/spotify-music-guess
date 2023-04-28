

export default class PlayAgainPlaylistsIds {
    private static storageName = 'play_again_playlists_ids'
    private static ids: string[] = JSON.parse(localStorage.getItem(this.storageName) || '[]')

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

    static getPlaylistsIds(): string[] {
        return this.ids
    }
}