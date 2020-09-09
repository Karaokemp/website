import React from 'react';
 
const DownloadingComponent = (props:{link:string}) => {
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