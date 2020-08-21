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
        download(song)
        res.json(song)
    }).catch((err)=>{
        console.error(err)
    })
})
export default app