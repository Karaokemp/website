import { observable,action, computed, set} from "mobx";
import React from "react";
import { KaraokempSong, MessageTheme, SecondaryComponentMode, Song} from "../types";

const KARAOKEMP_API = process.env.REACT_APP_KARAOKEMP_API || 'http://localhost:4000'

export class Store {
  @observable
  songs:string[] = []
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
  @action
  updateSongs(){
    fetch(`${KARAOKEMP_API}/songs`)
    .then(response => response.json())
    .then(songs =>{
      console.log(`Fetched Songs!`)
      this.songs = songs  
    });
  }

}


export const Context = React.createContext(new Store())