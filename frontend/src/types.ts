export class Song{
    videoId:string
    title:string
    image: string

    constructor(videoId:string,title:string, image:string){
        this.videoId = videoId
        this.title = title
        this.image = image
    }
}

export class KaraokempSong extends Song{
    cloudUrl:string

    constructor(videoId:string,title:string,image:string,cloudUrl:string){
       super(videoId,title,image)
        this.cloudUrl = cloudUrl
    }

}
export class SongSet{
    list: Array<KaraokempSong>
    constructor(){
        this.list = new Array<KaraokempSong>()
    }
    public add(song:KaraokempSong){
        if(!this.list.map(song=>song.videoId).includes(song.videoId)){
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
    SONGS_INVENTORY,
    SONG_SUGGESTIONS,
    NOTHING
  }
export enum MessageTheme{
    ERROR,
    SUCCESS,
    NOTHING
}

export enum Language{
    ENGLISH,
    HEWBREW
}