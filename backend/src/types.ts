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
     requests:Array<URL>
     readySongs:Array<Song>
     downloadingSongs:Array<Song>

     constructor(){
         this.requests = new Array<URL>();
         this.readySongs = []
         this.downloadingSongs =[]
     }
}
