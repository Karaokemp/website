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
export class State{
     requests:Array<Song>
     readySongs:Array<Song>
     downloadingSongs:Array<Song>

     constructor(){
         this.requests = [];
         this.readySongs = []
         this.downloadingSongs =[]
     }
}
