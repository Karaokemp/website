import { observable,action} from "mobx";
import { KaraokempSong, SecondaryComponentMode, Song} from "../types";

export class Store {
  @observable
  songSuggestions = new Array<Song>()
  @observable
  requests = new Array<Song>()
  @observable
  readySongs =  new Array<KaraokempSong>()
  @observable
  selectedVideoId = 'FxyQTb6n4_I'
  @observable
  message = {text:'Here is some text!',bootstrapClasses:"alert alert-danger alert-dismissible fade show"}
  @observable
  secondaryComponent = SecondaryComponentMode.BACKEND_STATE      
  @action
  selectSong(videoId: string) {
    this.selectedVideoId = videoId
  }
}