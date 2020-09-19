export class Song{
    videoId:string
    filename: string
    cloudUrl:S3URL

    constructor(videoId:string,filename:string,cloudUrl:S3URL){
        this.videoId = videoId
        this.filename = filename
        this.cloudUrl = cloudUrl

    }

}
export class SongSet{
     public list: Array<Song>
    constructor(){
        this.list = new Array<Song>()
    }
    public add(song:Song){
        if(!this.list.map(song=>song.filename).includes(song.filename)){
            this.list.push(song);
        }
    }
    
}
export class State{
     requests:Array<YoutubeURL>
     readySongs:SongSet
     downloading:YoutubeURL | null

     constructor(){
         this.requests = new Array<YoutubeURL>();
         this.readySongs = new SongSet()
         this.downloading = null
     }

     public getHello(){
        return 'hello'
    }
}

export class YoutubeURL extends URL{
    constructor(path:string){
        
            super(path)
    }

}

export function isYoutubePath(path:string):boolean{
    const m = '^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+'
    let result = path.match(m)
    if(result){
        return true
    }else{
        return false
    }
}

export class S3URL extends URL{
    constructor(path:string){
        super(path)
    }        
}

export class YoutubeURLTypeError extends TypeError{
    constructor(){
        super('Not a Youtube Path!')
    }
}