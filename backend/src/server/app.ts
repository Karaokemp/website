import {Song,State} from './types'
import { Request, Response } from "express";
import express from "express";
import download from '../functions/download'
import youtubedl from 'youtube-dl';
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());

 let state = new State();


app.get('/', (req: Request, res: Response) => res.send('Karaokemp website is online!\n'))
app.put('/link', (req: Request, res: Response) => {
    let link = new Song(req.body.path)
    state.requests.push(link)
    download(link.url).then((songInfo)=>{
        console.log(songInfo)

    })
    res.json(state)
});
export default app