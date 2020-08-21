import fs from 'fs'
import {Song} from '../types'


export default function download(song:Song){
  song.video.pipe(fs.createWriteStream(`songs/${song.filename}`))
}