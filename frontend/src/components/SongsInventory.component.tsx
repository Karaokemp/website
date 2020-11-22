import React, {Component} from 'react';
import Downloading from './downloading.component'
import {State,Song, YoutubeURL, KaraokempSong} from '../types'
import {Context} from '../store/store';
import { observer } from 'mobx-react';

@observer
export default class SongsInventoryComponent extends Component{
  static contextType = Context
 
    render(){
        return (<div>
       
          <h4>Songs for Burnerot 2020</h4>
          <p>{this.context?.songsInventory.length} karaoke songs</p>

        <hr/>
        <ol>
        {this.context.songsInventory.map((song:KaraokempSong,index:number) => <li key={index}><a href ={song.cloudUrl}>{song.title}</a></li>)}
          </ol>
      </div>)
    }

    componentDidMount(){
      this.context?.updateSongsInventory()
      
    }
}