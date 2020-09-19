import path from 'path'
import {Song,State, YoutubeURL} from '../../../types'
import { Request, Response } from "express";
import express from "express";
import Uploader from '../services/uploader'
import upload from '../functions/upload';
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var cors = require('cors')
app.use(cors());
let state = new State();
const uploader = new Uploader(state)
uploader.start();

app.get('/', (req: Request, res: Response) => res.send('Karaokemp backend is online!\n'))
app.put('/link', (req: Request, res: Response) => {
    console.log('got link!')
    let link = new YoutubeURL(req.body.path)
    state.requests.push(link)
    sendState(req,res)
    })

    app.get('/state',sendState)

    function sendState(req: Request, res: Response){           
            res.json(state);
    }

export default app