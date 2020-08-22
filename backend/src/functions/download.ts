import fs from 'fs'
import {Song} from '../types'
const SONGS_FOLDER = 'songs'


export default function download(song:Song){
  return new Promise<Song>((resolve:Function,reject:Function)=>{
        const video = song.video
        video.on('end', function() {
            resolve(song)
          })
          video.on('error',(err)=>{
              reject(err);
          })
          video.pipe(fs.createWriteStream(`${SONGS_FOLDER}/${song.filename}`))
        })        
}