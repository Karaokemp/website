import React, {Component, ChangeEvent, RefObject} from 'react';
import {observer} from 'mobx-react'
import {YoutubeURL,isYoutubePath, MessageTheme} from '../../types'
import './SongsSearch.css'
import karaokempLogo from '../../pics/logo.png';
import youtubeLogo from '../../pics/youtube-logo.svg';

import ReactPlayer from 'react-player'
import SecondaryComponent from '../secondary.component'
import ValidMark from '../validMark.component'
import {Context} from '../../store/store';
import MSG from '../message.component'

@observer
export default class SongsSearchComponent extends Component<{}, {
   term: string,
   message:{text:string,theme:MessageTheme}
  }>{

    static contextType = Context
    inputRef:RefObject<HTMLInputElement>

    constructor(props:any) {
      super(props)
      this.state = {
        term :'',
        message: {text:'',theme:MessageTheme.NOTHING},
    }
    this.inputRef = React.createRef();

  }

  render() {
    return(<div className="container">
  <div className="row">
    <div className="col-6 col-lg-6">
  <h1>Welcome to The Karaokemp!!! </h1>
      <div className="text-center"><img className='big' src={karaokempLogo} alt='' style={{height:'100px'}}/></div> <br/><hr/>
        
        <div className='instructions'>Steal Video from &nbsp;<img src={youtubeLogo}alt=''/>
        <input type="text" ref = {this.inputRef}
        onChange={this.handleInputChange.bind(this)}
        onKeyDown={this.handleKeyPressed.bind(this)}
        style={{ width: "80%" }} placeholder='title, artist, link'/>
        <ValidMark valid={!this.state.message && this.state.term.length >0 }/>

       <MSG message ={this.state.message} />
        </div>
        <ReactPlayer url="https://kcs-test-karaoke-songs.s3.eu-central-1.amazonaws.com/Baby_Got_Back_in_the_Style_of_Sir_Mix-A-Lot_karaoke_video_lyrics_(no_lead_vocal).mp4" 
        playing
  /> <h4>{this.context.selectedSong.title}</h4>
                <button  className="btn btn-primary" onClick={this.handleRequest.bind(this)}>Request song!</button>

        <hr/>

    </div>
    <div className="col-6 col-lg-6">
      <SecondaryComponent mode = {this.context.secondaryComponent} />
      </div>
  </div>
</div>)
  }

  handleInputChange(change:ChangeEvent<HTMLInputElement> ){
    let value = this.inputRef.current!.value
    if(value.length < 4){
      this.cleanMessage()
    } else if(isYoutubePath(value)){
      let link = new YoutubeURL(value)
      let videoId = link.searchParams.get('v')
      this.reportLink()

    }else{
      this.reportTerm()
  }
}

handleKeyPressed(event:any){
  if(event.key==='Enter'){
    const term = this.inputRef.current?.value
    console.log(`Search "${term}" on Youtube!`)
  }

}

  handleRequest(){
    if(this.context.selectedSong.videoId){
      this.sendRequest();
    }else{
      this.setState({message: {text:"Could not send request!",theme:MessageTheme.ERROR}})
    }

  }

  sendRequest(){
    console.log('sending request!')
  }

  toggleTheme(){
    const newTheme = this.state.message.theme == MessageTheme.ERROR ? MessageTheme.SUCCESS: MessageTheme.ERROR
    this.setState({message:{text:this.state.message.text,theme:newTheme}})
  }

  reportLink(){
    this.setState({
      message:{text: 'Found Youtube Link!', theme: MessageTheme.SUCCESS}
    })
  }

  reportTerm(){
    this.setState({
      message:{text: `Press Enter to search on Youtube!`, theme: MessageTheme.SUCCESS}
    })

  }

  cleanMessage(){
    this.setState({
      message:{text: '', theme: MessageTheme.NOTHING}
    })

  }

}