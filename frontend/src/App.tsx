import { Provider } from 'mobx-react';
import React, {Component} from 'react';
import SongsSearch from './components/songsSearch/SongsSearch.component'
import Test from './components/test.component'
import { Store } from './store/store';


export default class App extends Component{

  store = new Store();

  constructor(props:string) {
    super(props);
  }
  render() {
    return (<Provider store={this.store}>

      <SongsSearch/>
</Provider>)
  }
}
