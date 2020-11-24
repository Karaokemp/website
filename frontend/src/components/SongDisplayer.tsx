import React,{Component } from "react";
import ReactPlayer from "react-player";
import { JsxElement } from "typescript";
import { KaraokempSong, Song } from "../types";

const style = {height:'80%',width:'90%'}

export default class SongDisplayer extends Component<{song:Song,onClick:any},{}>{

    render(){
        const songType = this.props.song.constructor.name
        console.log(`Selected Song Type: ${songType}`)
        let window
        if( songType === 'KaraokempSong'){
            let playable = this.props.song as KaraokempSong
            window = <ReactPlayer url={playable.cloudUrl} playing controls/>
        }else{
            window = <img src={this.props.song.image} onClick={this.props.onClick} style={style}/>
        }
        return (<div>
            <p>{window}</p>
            <h4>{this.props.song.title}</h4>
        </div>)
    }

}