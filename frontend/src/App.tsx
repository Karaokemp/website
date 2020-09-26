import React, {Component} from 'react';
import SongsSearch from './components/songsSearch/SongsSearch.component'
import { Store,Context} from './store/store';

const {Provider} = Context
const store = new Store();




export default class App extends Component{
  

  constructor(props:string) {
    super(props);
  }
  render() {
    return (<Provider value={store}>

      <SongsSearch/>
</Provider>)
  }
}
