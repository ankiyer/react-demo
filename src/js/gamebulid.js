
import React from 'react';
import Fail from './compoment/fail.js';
import Road from './compoment/road.js';
let Tick;
class GameBoard extends React.Component{
  constructor(props){
    super(props);
    this.state=  {kilometr:0,//前进公里数
      heroLoc:0,//0车在左 1车在右
      enemyLoc:0,
      enemyType:0,
      enemySpeed:0,
      gameState:0,//0为游戏结束 1正在进行
      gamestart:0,
      gameover:0,
      aniend:true,//敌机是否死亡
      superMode:0,
      chunge:0,
      hassuper:0
  }
}
  gameStart(){//游戏开
    this.setState({
      heroLoc:0,//0车在左 1车在右
      enemyLoc:0,
      enemyType:0,
      enemySpeed:0,
      gameState:1,//0为游戏结束 1正在进行
      gamestart:1,
      gameover:0,
      aniend:true,//敌机是否死亡
      superMode:0,
      chunge:0,
      hassuper:0
    })

    this.gameTick(true);
    this.createEnemy();
  }
  gameHandle(e){ //键盘控制车向左向右
    // console.log(e.keycode);
    console.log(this.state.gameState+'   '+e.key);
    if(this.state.gameState==1){
      if(e.keyCode==37){
        console.log('left');
        this.setState({
          heroLoc:0
        })
      }
      else if(e.keyCode==39){
        console.log('right');
        this.setState({
          heroLoc:1
        })
      }
      else if(e.keyCode==32&&this.state.hassuper==1){
        this.setState({
        superMode:1,
        hassuper:0
        })
      }
    }
  }
  createEnemy(){//随机创建敌车 但是同一画面只能出现一辆
    let that=this,enemyclass,enemyloc,enemytype,enemyspeed,animationEnd=true;
      setInterval(function(){
        if(that.state.aniend&&that.state.gamestart==1){
          that.setState({aniend:false});
          enemytype=Math.floor(Math.random()*3);
          enemyloc=Math.round(Math.random());
          enemyspeed=Math.floor(Math.random()*3);
          that.setState({
            enemyLoc:enemyloc,
            enemyType:enemytype,
            enemySpeed:enemyspeed
          })
        }
      },1000);
      console.log(that.state);
      that.refs.enemy.addEventListener('webkitAnimationEnd',function(){
        that.setState({aniend:true});
      });
  }
  gameTick(state){
    let that=this,
        crash=620,
    heroloc,enemyloc,trs,dis,kilometer=0;
    if(state){
    Tick=setInterval(function(){
        trs=window.getComputedStyle(that.refs.enemy,null).getPropertyValue('transform');//获取样式
        // console.log(window.getComputedStyle(that.refs.enemy).getPropertyValue("transform"));
        dis=trs.split(',')[5].replace(")","");
        heroloc=that.state.heroLoc;
        enemyloc=that.state.enemyLoc;
        if(dis>crash&&dis<(crash+200)&&heroloc==enemyloc){
          if(that.state.superMode==1){
            that.superBuff();
          }
          else{
            that.gameOver();
        }
      }
        kilometer++;
        that.setState({
          kilometer:kilometer
        });
        if(kilometer%1000==0){
          that.superMode();
        }
      },10);}
      else{
        clearInterval(Tick);
      }

  }
  mobilesuper(){
    if(this.state.hassuper==1){
      this.setState({
        superMode:1,
        hassuper:0
      })
    }
}
  gameOver(){
    this.setState({
      gameover:1,
      gameState:0
    });
    this.gameTick(false);
  }
  superBuff(){
    var that =this;
    this.setState({
      chunge:1
    })
    setTimeout(function(){
      that.setState({chunge:0});
    },1000)
    // console.log('bug2');
  }
  superMode(){
    var that =this;
    that.setState({
      hassuper:1
    })
    setTimeout(function(){
      that.setState({superMode:0})
    },5000)
  }
  gamerestart(){
    this.gameStart();
  }
  componentDidMount(){
    console.log("---");
    window.addEventListener("keydown",this.gameHandle.bind(this),false);
    window.addEventListener("devicemotion", function(event) {
            var eventaccelerationIncludingGravity = event.accelerationIncludingGravity;
            if(that.state.gameState == 1){
                if(eventaccelerationIncludingGravity.x < -1){
                    that.setState({heroLoc : 0});
                }else if(eventaccelerationIncludingGravity.x > 1){
                    that.setState({heroLoc : 1});
                }
            }
        }, false);
  }
  mobilesuper(){
    if(this.state.hassuper==1){
      this.setState({
        superMode:1,
        hassuper:0
      })
    }
}
  render(){
    let state=this.state,
        enemycls=state.gamestart==0||state.aniend?'enemy':('enemy enemy'+state.enemyType+' speed'+state.enemySpeed+' loc'+state.enemyLoc),
        boardcls;
        if(state.gameover==1){
          boardcls='board crashed'
        }
        else if(state.superMode==1){
          boardcls='board superMode'
        }
        else{
          boardcls='board';
        }
    return (
      <div className={boardcls}>
        <div className={state.gamestart==1?'roaded roadRun':'roaded'}></div>
        <div className={state.gamestart==1?'road roadplay':'road'} >
          <div className={state.heroLoc==0?'hero left':'hero right'} onClick={this.func}></div>
          <div className={enemycls} ref='enemy'><div className={state.chunge==1?"body chunge":"body"}></div></div>
          <p className='help'>PC端用左右键控制，移动端左右摇摆手机</p>b
          <p className={state.hassuper==1?'helpsp show':'helpsp'}>空格键开启无敌模式</p>
        </div>
        <span className={state.gamestart==1?'start hide':'start'} onClick={this.gameStart.bind(this)}></span>
        <span className='kilo'> {state.kilometer}</span>
        <div className='failbub'>
          <span className='failtext'></span>
          <span className='retry' onClick={this.gameStart.bind(this)}></span>
        </div>
      </div>
    )
  }
}
export default GameBoard;
//游戏容器board ,路面roaded 路面范围road 主角车 hero 敌车enemy
//公里板就是分数 kilo ，失败提示：failbub
