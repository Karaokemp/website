import React, {Component} from 'react';
import Downloading from './downloading.component'
import {State,Song, YoutubeURL, KaraokempSong} from '../types'
import {Context} from '../store/store';
import { observer } from 'mobx-react';
import SongItem from './items/SongItem.component'

@observer
export default class SongsInventoryComponent extends Component{
  static contextType = Context
 
    render(){
        return (<div>
          <h4>Requests for The Next Event</h4>
          <p>{this.context?.songsInventory.length} karaoke songs</p>

        <hr/>
        <ol>
        {this.context.songsInventory.map((song:KaraokempSong,index:number) => <SongItem song={song} key={index} onClick={this.handleInventorySongClick.bind(this)}/>)}
        </ol>
      </div>)
    }
    

    componentDidMount(){
      this.context?.updateSongsInventory()
      
    }

    handleInventorySongClick(s:Song){
      this.context.selectSong(s)    
    }
}