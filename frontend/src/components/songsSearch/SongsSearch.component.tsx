import React, {Component, ChangeEvent, RefObject} from 'react';
import {observer} from 'mobx-react'
import {YoutubeURL,isYoutubePath, MessageTheme} from '../../types'
import './SongsSearch.css'
import karaokempLogo from '../../pics/logo.png';
import youtubeLogo from '../../pics/youtube-logo.svg';

import SecondaryComponent from '../secondary.component'
import {Context} from '../../store/store';
import MSG from '../message.component'
import SongsService from '../../services/SongsService';
import SongDisplayer from '../SongDisplayer/SongDisplayer';

@observer
export default class SongsSearchComponent extends Component<{}, {
   message:{text:string,theme:MessageTheme},
  }>{

    static contextType = Context
    inputRef:RefObject<HTMLInputElement>

    constructor(props:any) {
      super(props)
      this.state = {
        message: {text:'',theme:MessageTheme.NOTHING},
    }
    this.inputRef = React.createRef();

  }

  render() {
    return(<div className="container">
  <div className="row">
    <div className="col-6 col-lg-6">
  <h1>Karaokemp Website!</h1>
      <div className="text-center"><img className='big' src={karaokempLogo} alt='' style={{height:'100px',width:'100px'}}/></div> <br/><hr/>
        
        <div className='instructions'><p>Paste link from &nbsp;<img src={youtubeLogo}alt=''/>
        <input type="text" ref = {this.inputRef}
        onChange={this.handleInputChange.bind(this)}
        onKeyDown={this.handleKeyPressed.bind(this)}
        style={{ width: "90%" }} placeholder={`https://www.youtube.com/watch?v=${this.context.selectedSong.videoId}`}/>
      
       <MSG message ={this.state.message} />
        </p></div>
        <SongDisplayer
        onClick={this.handleClickDisplayedSong.bind(this)}
        />  

    </div>
    <div className="col-6 col-lg-6">
      <SecondaryComponent mode = {this.context.secondaryComponent} />
      </div>
  </div>
</div>)
  }

  handleInputChange(change:ChangeEvent<HTMLInputElement> ){
    let value = this.inputRef.current!.value
    if(value.length < 3){
      this.cleanMessage()
    } else if(isYoutubePath(value)){
      let link = new YoutubeURL(value)
      
        SongsService.getYoutubeSong(link).then(song=>{
          this.context.selectSong(song)
          this.reportLink()
        }).catch(err=>{
          console.error('Could not process link!')
          console.error(err.message)
          this.cleanMessage()
        })
      
    }else{
      this.reportTerm()
  }
}

handleClickDisplayedSong(){
  this.context.processSelectedSong()
}
handleKeyPressed(event:any){
  if(event.key==='Enter'){
    
    const term = this.inputRef.current?.value
    this.context.updateSuggestions(term)
    console.log(this.context.suggestions)
  }
}
  handleRequest(){
    if(this.context.selectedSong){
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

  componentDidMount(){
    this.context.updateSongsInventory()
  }

}