var Cat = require('animals/cat');
var Constants = require('media_constants');
var Floor = require('inanimate/floor');
var Mice = require('animals/mice');
var Random = require('random');
var Score = require('metrics/score');

var game = new Phaser.Game(800, 600, Phaser.AUTO, '',
  { preload: preload, create: create, update: update });

function preload() {
  game.load.audio(Constants.MEOW, 'media/audio/meow.ogg')
  game.load.image(Constants.CAT, 'media/sprites/Cat.png');
  game.load.image(Constants.MOUSE, 'media/sprites/Mouse.png');
  game.load.image(Constants.DEAD_MOUSE, 'media/sprites/DeadMouse.png');
  game.load.image(Constants.FLOOR, 'media/sprites/TileFloor.png');
}

var cat;
var mice;
var score;
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)

  var floor = new Floor(game);
  score = new Score(game)

  cat = new Cat(game);
  mice = new Mice(game);

  game.sound.play(Constants.MEOW);
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  cat.move(cursors);
  game.physics.arcade.overlap(cat.cat, mice.mice, killMouse, null, this);
}

/**
 * Kill mouse and update score on collision
 */
function killMouse(player, mouse) {
  mouse.kill();
  score.update();
}
