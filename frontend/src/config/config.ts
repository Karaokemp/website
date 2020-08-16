const BACKEND_PORT = 4001
export default class Config{
    public ENVIRONMENT: string;
    public URLS: {KARAOKEMP_BACKEND:String}

    constructor(){
        this.ENVIRONMENT = process.env.ENVIRONMENT || 'LOCAL';
        this.URLS = (this.ENVIRONMENT =='LOCAL') ? {KARAOKEMP_BACKEND:`localhost:${BACKEND_PORT}`}:{KARAOKEMP_BACKEND:`backend:${BACKEND_PORT}`}
    }
}
