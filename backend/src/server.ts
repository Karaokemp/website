
const SERVER_PORT = 4001;

import express from "express";
const app = express()
/*const bodyParser = require('body-parser');
app.use(bodyParser.json());*/

app.get('/', (req, res) => res.send('Karaokemp website is online!\n'))

app.listen( SERVER_PORT, () => {
    // tslint:disable-next-line:no-console
    console.log( `Karaokemp backend is listenning on ports ${ SERVER_PORT }` );
    
} );