import  youtubedl, { Info } from 'youtube-dl'
import path from 'path'
import { Song } from '../types'
export default function createSong(url:URL):Promise<Song>{
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