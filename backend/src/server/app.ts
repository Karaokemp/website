import {Song,State} from '../types'
import { Request, Response } from "express";
import express from "express";
import SongCreator from '../services/SongCreator'
import download from '../functions/download'
import youtubedl from 'youtube-dl';
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());

 let state = new State();


app.get('/', (req: Request, res: Response) => res.send('Karaokemp website is online!\n'))
app.put('/link', (req: Request, res: Response) => {
    let link = new URL(req.body.path)
    SongCreator.create(link).then((song)=>{
        console.log(song.filename)
        download(song).then(()=>{
            state.requests.push(song)
            let payload = state.requests.map((song)=>song.filename)
            res.json(payload)
        })
    }).catch((err)=>{
        console.error('error creating song')
    })
})
export default app