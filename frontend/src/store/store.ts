import { observable,action, computed, set} from "mobx";
import React from "react";
import {KaraokempSong, SecondaryComponentMode, Song} from "../types";
import SongsService from '../services/SongsService'


export class Store {
  @observable
  songsInventory:KaraokempSong[] = new Array<KaraokempSong>()
  @observable
  suggestions: Song[] = new Array<Song>()
  @observable
  selectedSong: Song = new KaraokempSong('FxyQTb6n4_I','MIKA - Love Today (Karaoke)','https://i.ytimg.com/vi/FxyQTb6n4_I/maxresdefault.jpg','https://kcs-test-karaoke-songs.s3.eu-central-1.amazonaws.com/MIKA_-_Love_Today_(Karaoke).mp4')
  @observable
  processingSelectedSong:boolean = false
  @observable
  secondaryComponent = SecondaryComponentMode.SONGS_INVENTORY      
  @action
  selectSong(song: Song) {
    const existed = this.songsInventory.find(existedSong=> existedSong.videoId === song.videoId)
    if(existed){
      this.selectedSong = existed
    }else{
      this.selectedSong = song
    }
  }
  @action
  processSelectedSong(){
    this.processingSelectedSong = true
    SongsService.processSong(this.selectedSong).then(newKaraokempSong=>{
      this.selectedSong = newKaraokempSong
      this.songsInventory.push(newKaraokempSong)
      this.secondaryComponent = SecondaryComponentMode.SONGS_INVENTORY

      this.processingSelectedSong = false
    }).catch(err=>{
      console.error(err.message)
    })
  }   
  @action
  updateSuggestions(term:string){
    SongsService.getYoutubeKaraokeResults(term).then(songs=>{
      this.suggestions.splice(0, this.suggestions.length)
      this.suggestions.push(...songs)
      this.secondaryComponent = SecondaryComponentMode.SONG_SUGGESTIONS
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