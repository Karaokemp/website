import React, {Component} from 'react';
import Downloading from '../components/downloading.component'
import {State,Song, YoutubeURL} from '../types'


export default class BackendStateComponent extends Component<{state:State| null}, {}>{
    
  constructor(props:{state:State}) {
        super(props);
  }
    render(){
      if(!this.props.state){
        return (<div><p>Waiting for connection to Karaokemp servers...</p></div>)
      }
      console.log(this.props.state.getHello())
      
        return (<div>
        <h4>Requests</h4>
        <hr/>
        <ol>
      {this.props.state.requests.map((link:YoutubeURL,index) => <li key={index}>{link}</li>)}
          </ol>
          <Downloading link={this.props.state.downloading}/>
          <h4>Ready Songs</h4>
        <hr/>
        <ol>
        {this.props.state.readySongs.list.map((song:Song,index) => <li key={index}>{song.cloudUrl}</li>)}
          </ol>
      </div>)
    }
}