import React, {Component} from 'react';
import Downloading from './downloading.component'
import {State,Song, YoutubeURL, SecondaryComponentMode} from '../types'
import { Context } from '../store/store';
import { observer } from 'mobx-react';

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
            <li key = {index}><a href ={`https://www.youtube.com/watch?v=${suggestion.videoId}`}
                                  onClick={(e)=>{
              e.preventDefault();
              this.handleSuggestionClick(suggestion)
              }}
            >{suggestion.title}</a></li>
          )}
          </ol>
        </div>)
    }

    handleSuggestionClick(s:Song){
      console.log(s)
      this.context.selectSong(s)    
    }
}