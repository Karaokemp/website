import React,{Component } from "react";
import ReactPlayer from "react-player";
import { JsxElement } from "typescript";
import { KaraokempSong, Song } from "../types";

const style = {height:'80%',width:'90%'}

export default class SongDisplayer extends Component<{song:any,onClick:any},{}>{

    render(){
        let window
        if(this.props.song.cloudUrl){
            window = <ReactPlayer url={this.props.song.cloudUrl} playing controls/>
        }else{
            window = <img src={this.props.song.image} onClick={this.props.onClick} style={style} title="click her to store the song"/>
        }
        return (<div>
            <p>{window}</p>
            <h4>{this.props.song.title}</h4>
        </div>)
    }

}