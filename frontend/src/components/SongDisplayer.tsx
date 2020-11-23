import React,{Component } from "react";
import ReactPlayer from "react-player";
import { JsxElement } from "typescript";
import { KaraokempSong, Song } from "../types";

export default class SongDisplayer extends Component<{song:Song},{}>{

    render(){
        const songType = this.props.song.constructor.name
        let window
        if( songType === 'KaraokempSong'){
            let playable = this.props.song as KaraokempSong
            window = <ReactPlayer url={playable.cloudUrl} playing controls/>
        }else{
            window = <img src={this.props.song.image} style={height}/>
        }
        return (<div>
            <p>{window}</p>
            <h4>{this.props.song.title}</h4>
        </div>)
    }

}