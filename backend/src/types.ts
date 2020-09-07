import youtubedl from "youtube-dl"

export class Song{
    url:URL
    filename:string
    video:youtubedl.Youtubedl

    constructor(url:URL,filename:string,video:youtubedl.Youtubedl){
        this.url = url
        this.filename = filename
        this.video = video
    }
}
export class SongSet{
    private list: Array<Song>
    constructor(){
        this.list = new Array<Song>()
    }
    public add(song:Song){
        if(!this.list.map(song=>song.filename).includes(song.filename)){
            this.list.push(song);

        }
    }
    public map(fn:(value: Song, index: number, array: Song[]) => any):Array<any>{
        return this.list.map(fn)
    }
}
export class State{
     requests:Array<URL>
     readySongs:SongSet

     constructor(){
         this.requests = new Array<URL>();
         this.readySongs = new SongSet()
     }
}
