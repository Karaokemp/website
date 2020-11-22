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
  selectedSong: Song = new KaraokempSong('1234','Baby got back','https://kcs-test-karaoke-songs.s3.eu-central-1.amazonaws.com/Baby_Got_Back_in_the_Style_of_Sir_Mix-A-Lot_karaoke_video_lyrics_(no_lead_vocal).mp4')
  @observable
  secondaryComponent = SecondaryComponentMode.SONGS_INVENTORY      
  @action
  selectSong(song: Song) {
    this.selectedSong = song
  }

    @action
    
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
      console.log(this.songsInventory.length)
    }).catch(err=>{
      console.error(err.message)
    })
  }
}
export const Context = React.createContext(new Store())