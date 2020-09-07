import path from 'path'
import {Song,State} from '../types'
import { Request, Response } from "express";
import express from "express";
import Downloader from '../services/downloader'
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
let state = new State();
const downloader = new Downloader(state)
downloader.start();

app.get('/', (req: Request, res: Response) => res.send('Karaokemp backend is online!\n'))
app.put('/link', (req: Request, res: Response) => {
    let link = new URL(req.body.path)
    state.requests.push(link)
    sendState(req,res)
    })

    app.get('/state',sendState)

    function sendState(req: Request, res: Response){

        let payload = {
            requests: state.requests,
            readySongs: state.readySongs.map(song => song.getName()
            )
            }
            res.json(payload);
    }

export default app