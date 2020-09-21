import React, {Component} from 'react';
import Downloading from './downloading.component'
import {State,Song, YoutubeURL, SecondaryComponentMode} from '../types'


export default class SongSuggestionsComponent extends Component<{}, {}>{
    
  constructor(props:{mode:SecondaryComponentMode}) {
        super(props);
  }
    render(){
      return (<h4>Suggestions</h4>)
    }
}