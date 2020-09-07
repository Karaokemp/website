import React, {Component} from 'react';

export default class BackendStateComponent extends Component<{requests:Array<string>,readySongs:Array<string>}, {}>{
    
  constructor(props:{requests:Array<string>,readySongs:Array<string>}) {
        super(props);
  }
    render(){
        return (<div>
        <h4>Requests</h4>
        <hr/>
        <ol>
      {this.props.requests.map((url,index) => <li key={index}>{url}</li>)}
          </ol>
          <h4>Ready Songs</h4>
        <hr/>
        <ol>
      {this.props.readySongs.map((song,index) => <li key={index}>{song}</li>)}
          </ol>
      </div>)
    }
}