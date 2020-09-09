import React, {Component} from 'react';
import Downloading from '../components/downloading.component'


export default class BackendStateComponent extends Component<{requests:Array<string>,readySongs:Array<string>,downloading:string}, {}>{
    
  constructor(props:{requests:Array<string>,readySongs:Array<string>, downloading:string}) {
        super(props);
  }
    render(){
        return (<div>
        <h4>Requests</h4>
        <hr/>
        <ol>
      {this.props.requests.map((url,index) => <li key={index}>{url}</li>)}
          </ol>
          <Downloading link={this.props.downloading}/>
          <h4>Ready Songs</h4>
        <hr/>
        <ol>
      {this.props.readySongs.map((song,index) => <li key={index}>{song}</li>)}
          </ol>
      </div>)
    }
}