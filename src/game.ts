///<reference path='../typescript/phaser.d.ts' />

import States    from './constants/state';
import BootState from './states/boot';
import LoadState from './states/load';
import OverState from './states/over';
import PlayState from './states/play';


const game = new Phaser.Game('95', '95');
game.state.add(States.BOOT, BootState);
game.state.add(States.LOAD, LoadState);
game.state.add(States.OVER, OverState);
game.state.add(States.PLAY, PlayState);
game.state.start(States.BOOT);
