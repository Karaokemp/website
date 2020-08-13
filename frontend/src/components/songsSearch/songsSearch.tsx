import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';


export default class songsSearch extends Component{
  constructor(props:string) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    }

  }
  render() {
    console.log(this.state);
    return(
      <div>
        <h3>Welcome to karaokemp!</h3>
        <p>try to publish failed tests.</p>
      </div>
    )
  }
}

