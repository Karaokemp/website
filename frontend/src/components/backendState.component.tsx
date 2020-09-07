import backendState from '../static/state.json'
import React, {Component} from 'react';

export default class BackendStateComponent extends Component<{}, {requests:Array<string>,readySongs:Array<string>}>{
    constructor(props:string) {
        super(props);
        this.state = {
            requests: new Array<string>(),
            readySongs: new Array<string>()
        }
    }
    render(){
        return (<div>
        <h4>Requests</h4>
        <hr/>
        <ol>
      {backendState.requests.map((url,index) => <li key={index}>{url}</li>)}
          </ol>
          <h4>Ready Songs</h4>
        <hr/>
        <ol>
      {backendState.readySongs.map((song,index) => <li key={index}>{song}</li>)}
          </ol>
      </div>)}
}