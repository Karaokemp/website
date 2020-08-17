export class Song{
    url:string
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