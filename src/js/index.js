require('../less/main.less');
import GameBoard from './gamebulid.js';
import ReactDom from 'react-dom';
import React from 'react';
console.log(GameBoard);
ReactDom.render(<GameBoard/>,document.getElementById('mygame'));
