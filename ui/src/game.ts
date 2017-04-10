///<reference path='../typings/index'/>

import BootState from './states/boot';
import ControlsState from './states/controls';
import LoadState from './states/load';
import MenuState from './states/menu';
import OverState from './states/over';
import PlayState from './states/play';
import States from './constants/state';


const game = new Phaser.Game('99', '99');

game.state.add(States.BOOT, BootState);
game.state.add(States.CONTROLS, ControlsState);
game.state.add(States.LOAD, LoadState);
game.state.add(States.MENU, MenuState);
game.state.add(States.OVER, OverState);
game.state.add(States.PLAY, PlayState);

game.state.start(States.BOOT);
