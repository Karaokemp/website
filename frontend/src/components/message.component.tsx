import { inject, observer } from 'mobx-react';
import React from 'react';
import { Store } from '../store/store';
 
const MessageComponent = inject("store") (observer((props:{ store?: Store }) => {
    if(props.store!.message){
        return (<div className={props.store!.messageThemeBootstrapClasses}>
        <strong>{props.store!.message.text}</strong></div>)
    }else{
        return (<div></div>)
    }
   
  }))

  export default MessageComponent