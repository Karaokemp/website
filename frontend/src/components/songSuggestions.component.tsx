import React, {Component} from 'react';
import Downloading from './downloading.component'
import {State,Song, YoutubeURL, SecondaryComponentMode} from '../types'
import { Context } from '../store/store';
import { observer } from 'mobx-react';
import SongItem from './items/SongItem.component'


@observer
export default class SongSuggestionsComponent extends Component<{}, {}>{
  static contextType = Context

    
  constructor(props:{mode:SecondaryComponentMode}) {
        super(props);
  }
    render(){
      return (<div>
        <h4>Suggestions</h4>
        <ol>
          {this.context.suggestions.map((suggestion: Song,index: number)=>
            <SongItem song={suggestion} key = {index} onClick={this.handleSuggestionClick.bind(this)}/>)}
          </ol>
        </div>)
    }

    handleSuggestionClick(s:Song){
      this.context.selectSong(s)    
    }
}