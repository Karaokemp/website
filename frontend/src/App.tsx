import React, {Component} from 'react';
import SongsSearch from './components/songsSearch/SongsSearch.component'
import { Store,Context} from './store/store';
import Test from '../src/components/test.component'

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