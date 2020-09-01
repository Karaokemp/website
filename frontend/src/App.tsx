import React, {Component} from 'react';
import SongsSearch from './components/songsSearch/SongsSearch.component'


export default class App extends Component{
  constructor(props:string) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    }

  }
  render() {
    return (<div>
      <SongsSearch/>
</div>)
  }
}
