

export default class PlayAgainPlaylistsIds {
    private static storageName = 'play_again_playlists_ids'
    private static ids: string[] = JSON.parse(localStorage.getItem(this.storageName) || '[]')

    static savePlaylistId(playlistId: string): number {
        const indexPlaylistId =  this.ids.indexOf(playlistId)
        if (indexPlaylistId !== -1) {
            delete this.ids[indexPlaylistId]
        }
        this.ids.push(playlistId)
        localStorage.setItem(this.storageName, JSON.stringify(this.ids))

        return indexPlaylistId
    }

    static getPlaylistsIds(): string[] {
        return this.ids
    }
}