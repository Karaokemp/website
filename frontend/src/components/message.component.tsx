import {observer} from 'mobx-react';
import React, { useContext } from 'react';
import {Context} from '../store/store';
import { MessageTheme } from '../types';

function getThemeBootstrapClasses(theme:MessageTheme) {
  switch(theme){
    case MessageTheme.ERROR:
    return "alert alert-danger alert-dismissible fade show"
    case MessageTheme.SUCCESS:
    return "alert alert-success"
    case MessageTheme.NOTHING:
      return ''
    }
}
 
const MessageComponent = observer((props:{message:{text:string,theme:MessageTheme}}) => {
return (<div className = {getThemeBootstrapClasses(props.message.theme)}>{props.message.text}</div>)

  })

  export default MessageComponent