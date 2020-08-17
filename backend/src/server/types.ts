export class Link{
    url:string
}
export class State{
     requests:Array<Link>
     readySongs:Array<Link>
     downloadingSongs:Array<Link>

     constructor(){
         this.requests = [];
         this.readySongs = []
         this.downloadingSongs =[]
     }

}