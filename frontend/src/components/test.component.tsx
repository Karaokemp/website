import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import { KaraokempSong, Song } from '../types';
import SongDisplayer from './SongDisplayer/SongDisplayer';


export default class App extends Component{
  constructor(props:string) {
    super(props);
  }
  render () {
    const song = new KaraokempSong('"AUjmpbd-U2Q','The Bad Touch - The Bloodhound Gang | Karaoke Version | KaraFun','https://i.ytimg.com/vi/AUjmpbd-U2Q/hqdefault.jpg','https://kcs-test-karaoke-songs.s3.eu-central-1.amazonaws.com/Baby_Got_Back_in_the_Style_of_Sir_Mix-A-Lot_karaoke_video_lyrics_(no_lead_vocal).mp4')
    return (
        <SongDisplayer song = {song}/>
    )
}
}
