import { observer } from "mobx-react";
import React,{Component } from "react";
import ReactPlayer from "react-player";
import { JsxElement } from "typescript";
import { Context } from "../../store/store";
import { KaraokempSong, Song } from "../../types";
import './SongDisplayer.css'

const style = {height:'80%',width:'90%'}
@observer
export default class SongDisplayer extends Component<{onClick:any},{}>{
    static contextType = Context


    render(){
        let window
        if(this.context.selectedSong.cloudUrl){
            window = <ReactPlayer url={this.context.selectedSong.cloudUrl} width={style.width} height = {style.height}
            playing controls/>
        }else{
            window = <img src={this.context.selectedSong.image} onClick={this.props.onClick} style={style}
            title="click here to add this song"
            className={this.context.processingSelectedSong ? 'processing' : ''}/>
        }
        return (<div>
            <p>{window}</p>
            <h4>{this.context.selectedSong.title}</h4>
        </div>)
    }

}