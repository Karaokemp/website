
import { Request, Response } from "express";
import express from "express";
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => res.send('Karaokemp website is online!\n'))
app.put('/link', (req: Request, res: Response) => {
    let link = req.body;
    res.send(`Karaokemp got your link!\n`)
    console.log(link);
});
export default app