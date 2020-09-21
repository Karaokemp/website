import path from 'path'
import {Song,State, YoutubeURL} from '../types'
import { Request, Response } from "express";
import express from "express";
import Uploader from '../services/uploader.service'
import SongsFinder from '../services/songsFinder.service'
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var cors = require('cors')
app.use(cors());
let state = new State();
const uploader = new Uploader(state)
const finder = new SongsFinder()
uploader.start();

app.get('/', (req: Request, res: Response) => res.send('Karaokemp backend is online!\n'))
app.put('/link', (req: Request, res: Response) => {
    let link = new YoutubeURL(`https://www.youtube.com/watch?v=${req.body.videoId}`)
    state.requests.push(link)
    sendState(req,res)
    })

    app.get('/songs', (req: Request, res: Response) =>{
        finder.find('karaoke creap radiohead').then((videos)=>{
            res.json(videos)
        })
    })


    app.get('/state',sendState)

    function sendState(req: Request, res: Response){           
            res.json(state);
    }

export default app