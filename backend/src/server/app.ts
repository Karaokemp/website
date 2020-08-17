

import express from "express";
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Karaokemp website is online!\n'))
app.get('/link', (req, res) => res.send('Karaokemp website is online\n'))

export default app