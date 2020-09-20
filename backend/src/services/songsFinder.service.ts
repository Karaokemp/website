import { resolve } from 'path'
import yts from 'yt-search'
import { Song } from '../types'
export default class SongFinderService{

    async find(term:string){
        const r = await yts(term)
        return r.videos.map(video => new Song(video.videoId,video.title,video.image)).slice(0,10)
    }



}