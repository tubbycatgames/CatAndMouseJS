var Cat       = require('animals/cat');
var Constants = require('media_constants');
var Floor     = require('inanimate/floor');
var Mice      = require('animals/mice');
var Score     = require('metrics/score');

var game = new Phaser.Game(800, 600, Phaser.AUTO, '',
                           {preload: preload, create: create, update: update});

function preload() {
  game.load.image(Constants.CAT,        'media/sprites/Cat.png');
  game.load.image(Constants.DEAD_MOUSE, 'media/sprites/DeadMouse.png');
  game.load.image(Constants.FLOOR,      'media/sprites/TileFloor.png');
  game.load.audio(Constants.MEOW,       'media/audio/meow.ogg')
  game.load.image(Constants.MOUSE,      'media/sprites/Mouse.png');
}

var cat;
var mice;
var score;
var cursors;
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  Floor(game);
  score = new Score(game);
  cat = new Cat(game);
  mice = new Mice(game, 20);

  cursors = game.input.keyboard.createCursorKeys();
  game.sound.play(Constants.MEOW);
}

function update() {
  cat.move(cursors);
  game.physics.arcade.overlap(cat.sprite, mice.group, killMouse, null, this);
}

/**
 * Kill mouse and update score on collision
 */
function killMouse(player, mouse) {
  mouse.kill();
  score.update();
}
