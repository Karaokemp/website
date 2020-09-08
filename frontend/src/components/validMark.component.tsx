import React from 'react';
 
const ValidMarkComponent = (props:{valid:boolean}) => {
    if(props.valid){
        return (<span style={{fontSize:'30px'}}>&#10004;</span>)
  }else{
      return (<div></div>)
  }
}

  export default ValidMarkComponent