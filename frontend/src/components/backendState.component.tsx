import React, {Component} from 'react';

export default class BackendStateComponent extends Component<{}, {requests:Array<string>,readySongs:Array<string>}>{
    constructor(props:string) {
        super(props);
        this.state ={
          requests:[],
          readySongs:[]
        }
        
    }
    render(){
        return (<div>
        <h4>Requests</h4>
        <hr/>
        <ol>
      {this.state.requests.map((url,index) => <li key={index}>{url}</li>)}
          </ol>
          <h4>Ready Songs</h4>
        <hr/>
        <ol>
      {this.state.readySongs.map((song,index) => <li key={index}>{song}</li>)}
          </ol>
      </div>)
    }

    componentDidMount() {
        fetch('http://localhost:4000/state')
        .then(res => res.json())
        .then((data) => {
            console.log(data)
          this.setState(data)
        })
        .catch(console.log)
      }
}