export class Song{
    videoId:string
    title:string
    imageUrl:URL | null

    constructor(videoId:string,title:string,imagePath:string){
        this.videoId = videoId
        this.title = title
            this.imageUrl = imagePath ? new URL(imagePath) : null
    }
}

export class KaraokempSong extends Song{
    filename: string
    cloudUrl:S3URL

    constructor(videoId:string,title:string,imagePath:string,filename:string,cloudUrl:S3URL){
       super(videoId,title,imagePath)
        this.filename = filename
        this.cloudUrl = cloudUrl
    }

}
export class SongSet{
    list: Array<KaraokempSong>
    constructor(){
        this.list = new Array<KaraokempSong>()
    }
    public add(song:KaraokempSong){
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

export enum SecondaryComponentMode {
    BACKEND_STATE,
    SONG_SUGGESTIONS,
    NOTHING
  }
export enum MessageTheme{
    ERROR,
    SUCCESS,
    NOTHING
}