var States    = require('constants/state');
var bootState = require('states/boot');
var loadState = require('states/load');
var playState = require('states/play');


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
game.state.add(States.BOOT, bootState);
game.state.add(States.LOAD, loadState);
game.state.add(States.PLAY, playState);
game.state.start(States.BOOT);
