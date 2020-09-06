import download from '../functions/download'
import createSong from '../functions/createSong'
import {State} from '../types'
import { request } from 'express'

const INTERVAL = 3000

export default class downloadService{
    state: State

    constructor(state: State){
        this.state = state
    }

    handleRequest(){
        if(this.state.requests.length){
            let request = this.state.requests.shift();
            console.log(`handlink request: ${request.href}`)
            createSong(request).then(download)

        }
    }
    start(){
        console.log('start')
       
        }

   
}