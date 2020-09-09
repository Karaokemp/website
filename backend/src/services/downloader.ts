import download from '../functions/download'
import createSong from '../functions/createSong'
import {State, Song} from '../types'
import { request } from 'express'

const INTERVAL = 3000

export default class DownloadService{
    state: State

    constructor(state: State){
        this.state = state
    }

    handleRequest(){
        if(this.state.requests.length){
            let request = this.state.requests.shift();
            this.state.downloading = request
            console.log(`handling request: ${request}`)
            createSong(request).then(download).then((song:Song)=>{
                console.log(`created: ${song.filename}`)
                this.state.readySongs.add(song)
                this.state.downloading = null
            }).catch((err:Error)=>{
                console.error(err.message)
            })
           
        }
    }
    public start(){
        console.log('start download service')
       setInterval(this.handleRequest.bind(this),INTERVAL)
    }
}