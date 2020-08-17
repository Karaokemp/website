import {Song,State} from './types'
import { Request, Response } from "express";
import express from "express";
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());

 let state = new State();


app.get('/', (req: Request, res: Response) => res.send('Karaokemp website is online!\n'))
app.put('/link', (req: Request, res: Response) => {
    let link = <Song> req.body;
    state.requests.push(link)
    res.json(state)
});
export default app