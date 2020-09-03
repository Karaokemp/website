import React, {Component} from 'react';
import SongsSearch from './components/songsSearch/SongsSearch.component'


export default class App extends Component{
  constructor(props:string) {
    super(props);
  }
  render() {
    return (<div>
      <SongsSearch/>
</div>)
  }
}
