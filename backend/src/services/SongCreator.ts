import  youtubedl, { Info } from 'youtube-dl'
import path from 'path'
import { Song } from '../types'
export default class SongCreator{
    static create(url:URL){
        return new Promise<Song>((resolve:Function,reject:Function)=>{
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
      }
}