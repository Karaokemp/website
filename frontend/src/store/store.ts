import { observable,action, computed, set} from "mobx";
import { title } from "process";
import React from "react";
import {KaraokempSong, SecondaryComponentMode, Song} from "../types";
import SongsService from '../services/SongsService'


export class Store {
  @observable
  songsInventory:KaraokempSong[] = new Array<KaraokempSong>()
  @observable
  suggestions: Song[] = new Array<Song>()
  @observable
  selectedSong: Song = new Song('FxyQTb6n4_I','MIKA - Love Today (Karaoke)','https://i.ytimg.com/vi/FxyQTb6n4_I/maxresdefault.jpg')
  @observable
  secondaryComponent = SecondaryComponentMode.SONGS_INVENTORY      
  @action
  selectSong(song: Song) {
    this.selectedSong = song
  }
  @action
  processSelectedSong(){
    SongsService.processSong(this.selectedSong).then(karaokempSong=>{
      this.selectedSong = karaokempSong
      console.log(this.selectedSong)
    }).catch(err=>{
      console.error(err.message)
    })
  }   
  @action
  updateSuggestions(term:string){
    SongsService.getYoutubeResults(term).then(songs=>{
      this.suggestions = songs;
    })
  }
  @action
  updateSongsInventory(){
    SongsService.getBucketSongs().then(songs=>{
      this.songsInventory = songs
    }).catch(err=>{
      console.error(err.message)
    })
  }
  
}
export const Context = React.createContext(new Store())