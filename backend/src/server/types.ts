export class Song{
    url:URL

    constructor(path:string){
        this.url = new URL(path)

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