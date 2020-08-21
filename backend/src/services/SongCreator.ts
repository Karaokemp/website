import  youtubedl, { Info } from 'youtube-dl'
import path from 'path'
import { Song } from '../types'
const SONGS_DIR = 'songs'
console.log(SONGS_DIR)
export default class SongCreator{
    static create(url:URL){
        let forceResolve: Function
        let promise = new Promise<Song>((resolve:Function,reject:Function)=>{
            forceResolve = resolve.bind(this)
              const video = youtubedl(url.href,
              ['--format=18'],
              {})
              video.on('info', function(info:youtubedl.Info) {
                  let song = new Song(url,info._filename,video)
                  resolve(song)
                })
                video.on('error',(err)=>{
                    reject(err);
                })
                
              })
              return promise     
      }
    
}