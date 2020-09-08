export class YoutubeURL extends URL{
    constructor(path:string){
        
            super(path)
        if(!this.isYoutubePath(path)){
            throw new YoutubeURLTypeError()
        }
    }

    isYoutubePath(path:string):boolean{
        const m = '^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+'
        let result = path.match(m)
        if(result){
            return true
        }else{
            return false
        }
    }
}

export class YoutubeURLTypeError extends TypeError{
    constructor(){
        super('Not a Youtube Path!')
    }
}