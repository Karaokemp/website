const BACKENS_PORT = 4001
export default class Config{
    ENVIRONMENT:string
    URLS:{KARAOKEMP_BACKEND:string}

    constructor(){
        this.ENVIRONMENT = 'LOCAL'
        this.URLS = (this.ENVIRONMENT == 'LOCAL') ? {KARAOKEMP_BACKEND:`localhost:${BACKENS_PORT}`}:{KARAOKEMP_BACKEND:`backend:${BACKENS_PORT}`}
    }

}