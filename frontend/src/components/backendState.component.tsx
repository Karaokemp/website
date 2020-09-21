import React, {Component} from 'react';
import Downloading from '../components/downloading.component'
import {State,Song, YoutubeURL} from '../types'


export default class BackendStateComponent extends Component<{}, {backendState:State|null}>{
    
  constructor(props: Readonly<{}>) {
        super(props);
        this.state ={
          backendState: null
        }
  }

  componentDidMount() {
    this.updateBackendState()
   }
   updateBackendState() {
     fetch('http://localhost:4000/state')
     .then(res => res.json())
     .then((newBackendState:State) => {
       this.setState({backendState:newBackendState})
     }).catch(console.error)
     
   }
    render(){
      if(!this.state.backendState){
        return (<div><p>Waiting for connection to Karaokemp servers...</p></div>)
      }      
        return (<div>
        <h4>Requests</h4>
        <hr/>
        <ol>
      {this.state.backendState.requests.map((link:YoutubeURL,index) => <li key={index}>{link}</li>)}
          </ol>
          <Downloading link={this.state.backendState.downloading}/>
          <h4>Ready Songs</h4>
        <hr/>
        <ol>
        {this.state.backendState.readySongs.list.map((song:Song,index) => <li key={index}>{song.cloudUrl}</li>)}
          </ol>
      </div>)
    }
}