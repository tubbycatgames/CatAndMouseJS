var Cat = require('animals/cat');
var Constants = require('media_constants');
var Floor = require('inanimate/floor');
var Mice = require('animals/mice');
var Random = require('random');

var game = new Phaser.Game(800, 600, Phaser.AUTO, '',
  { preload: preload, create: create, update: update });

/**
 * Load all base assets for the game
 */
function preload() {
  game.load.audio(Constants.MEOW, 'media/audio/meow.ogg')
  game.load.image(Constants.CAT, 'media/sprites/Cat.png');
  game.load.image(Constants.MOUSE, 'media/sprites/Mouse.png');
  game.load.image(Constants.DEAD_MOUSE, 'media/sprites/DeadMouse.png');
  game.load.image(Constants.FLOOR, 'media/sprites/TileFloor.png');
}

var cat;
var mice;
/**
 * Setup the initial state of the game
 */
function create() {
  var floor = new Floor(game);

  cat = new Cat(game);
  mice = new Mice(game);

  game.sound.play(Constants.MEOW);
}

/**
 * Handle game updates
 */
function update() {
}
