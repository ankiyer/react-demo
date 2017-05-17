import React from 'react';
export default class Fail extends React.Component{
  constructor(props){
    super(props);
  }
render(){
  return(
    <div className='failbub'>
    <span className='failtext'></span>
    <span className='retry' onClick={this.props.gameStart.bind(this)}></span>
    </div>
  )
}
}
