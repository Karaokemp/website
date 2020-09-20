import upload from '../functions/upload'
import {State, Song, YoutubeURL} from '../types'

const INTERVAL = 3000

export default class uploadService{
    state: State

    constructor(state: State){
        this.state = state
    }

    handleRequest(){
        if(this.state.requests.length && !this.state.downloading){
            let request = this.state.requests.shift();
            this.state.downloading = request
            console.log(`handling request: ${request}`)
           
                upload(request).then((song)=>{
                    this.state.readySongs.add(song)
                    this.state.downloading = null
                }).catch((err)=>{
                    console.error(err.message)
                })
        }
    }
    public start(){
        console.log('start download service')
       setInterval(this.handleRequest.bind(this),INTERVAL)
    }
}