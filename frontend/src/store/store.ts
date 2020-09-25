import { observable,action, computed} from "mobx";
import { KaraokempSong, MessageTheme, SecondaryComponentMode, Song} from "../types";

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
  message = {text:'Here is some text!',theme:MessageTheme.SUCCESS}
  @observable
  secondaryComponent = SecondaryComponentMode.BACKEND_STATE      
  @action
  selectSong(videoId: string) {
    this.selectedVideoId = videoId
  }
  @action
  toggleTheme(){

    this.message.theme = this.message.theme == MessageTheme.ERROR ? MessageTheme.SUCCESS: MessageTheme.ERROR
  }
   @computed
   get messageThemeBootstrapClasses() {
        switch(this.message.theme){
          case MessageTheme.ERROR:
          return "alert alert-danger alert-dismissible fade show"
          case MessageTheme.SUCCESS:
          return "alert alert-success"
          }

    }
}