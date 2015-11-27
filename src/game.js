var change = require('chance')

var game = new Phaser.Game(800, 600, Phaser.AUTO, '',
  { preload: preload, create: create, update: update });

function preload() {
  game.load.image('cat', 'media/sprites/Cat.png');
  game.load.image('mouse', 'media/sprites/Mouse.png');
  game.load.image('deadMouse', 'media/sprites/DeadMouse.png');
  game.load.image('tileFloor', 'media/sprites/TileFloor.png');
}

function create() {
  var floorImage = game.cache.getImage('tileFloor');
  for (var currentx = 0; currentx < game.width; currentx += floorImage.width) {
    for (var currenty = 0; currenty < game.height; currenty += floorImage.height) {
      game.add.image(currentx, currenty, 'tileFloor');
    }
  }

  var catImage = game.cache.getImage('cat');
  game.add.sprite(randomX(game, catImage), randomY(game, catImage), 'cat');

  var mouseImage = game.cache.getImage('mouse');
  for (var currentMouse = 0; currentMouse < 20; currentMouse++) {
    game.add.sprite(randomX(game, mouseImage), randomY(game, mouseImage), 'mouse');
  }
}

function update() {
}

function randomX(game, image) {
  return chance.integer({min: 0, max: game.width - image.width})
}

function randomY(game, image) {
  return chance.integer({min: 0, max: game.height - image.height})
}
