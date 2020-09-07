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

          let filePath = `${SONGS_FOLDER}/${song.filename}`
          if(fs.existsSync(filePath)){
            resolve(song)
          }else{
            video.pipe(fs.createWriteStream(filePath))
          }
        })        
}