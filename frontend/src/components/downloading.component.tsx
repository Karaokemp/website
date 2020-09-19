import React from 'react';
import { YoutubeURL } from '../types';
 
const DownloadingComponent = (props:{link:YoutubeURL | null}) => {
    if(props.link){
        return (<div className="alert alert-info" role="alert">
        <h5>Downloading:</h5>
        <p> {props.link}</p>
    </div>
        )
  }else{
      return (<div></div>)
  }
}

  export default DownloadingComponent