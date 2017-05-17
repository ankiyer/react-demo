import React from 'react';
export default class Road extends React.Component{
  constructor(props){
    super(props);
    this.state={
      heroLoc:props.heroLoc,
      enemycls:props.enemycls,
      hassuper:props.hassuper,
      gamestart:props.gamestart
    }
  }

  render(){
    let state =this.state;
    return (
      <div className={state.gamestart==1?'road roadplay':'road'} >
        <div className={state.heroLoc==0?'hero left':'hero right'} onClick={this.func}></div>
        <div className={state.enemycls} ref='enemy'></div>
        <p className='help'>PC端用左右键控制，移动端左右摇摆手机</p>
        <p className={state.hassuper==1?'helpsp show':'helpsp'}>空格键开启无敌模式</p>
      </div>
    )
  }
}
