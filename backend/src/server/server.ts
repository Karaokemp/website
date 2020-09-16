import app from './app';
import Downloader from '../services/uploader'
const SERVER_PORT = 4000;

app.listen( SERVER_PORT, () => {
    // tslint:disable-next-line:no-console
    console.log( `Karaokemp backend is listenning on ports ${ SERVER_PORT }` );
} );

