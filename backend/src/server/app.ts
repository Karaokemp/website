import {Song,State} from '../types'
import { Request, Response } from "express";
import express from "express";
import createSong from '../functions/createSong'
import download from '../functions/download'
import youtubedl from 'youtube-dl';
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
let state = new State();

function sendState(req: Request, res: Response){

    let payload = {
        requests: state.requests,
        downloading: state.downloadingSongs.map((song:Song)=>song.filename),
        readySongs: state.readySongs.map((song:Song)=>{song.filename})
        }
        res.json(payload);
}

app.get('/', (req: Request, res: Response) => res.send('Karaokemp website is online!\n'))
app.put('/link', (req: Request, res: Response) => {
    let link = req.body.path
    state.requests.push(link)
    sendState(req,res)
    })

    app.get('/state',sendState)

export default app