import React from 'react';
 
const ErrorComponent = (props:{errorMessage:string}) => {
    if(props.errorMessage){
        return (<div className="alert alert-danger alert-dismissible fade show">
        <strong>{props.errorMessage}</strong></div>)
    }else{
        return (<div></div>)
    }
   
  }

  export default ErrorComponent