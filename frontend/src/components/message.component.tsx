import {observer} from 'mobx-react';
import React, { useContext } from 'react';
import {Context} from '../store/store';
 
const MessageComponent = observer(() => {
    const store = useContext(Context);
    console.log(store)
return (<div className = {store.messageThemeBootstrapClasses}>{store.message.text}</div>)

  })

  export default MessageComponent