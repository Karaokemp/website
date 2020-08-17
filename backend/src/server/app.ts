
import { Request, Response } from "express";
import express from "express";
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());

    let requests:Array<Link> = []
    let readySongs:Array<Link> = []
    let downloadingSongs:Array<Link> = []

app.get('/', (req: Request, res: Response) => res.send('Karaokemp website is online!\n'))
app.put('/link', (req: Request, res: Response) => {
    let link = <Link> req.body;
    requests.push(link)
    res.json(requests)
    console.log(requests);
});
export default app

class Link{
    url:string
}