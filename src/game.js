var change = require('chance');

var game = new Phaser.Game(800, 600, Phaser.AUTO, '',
  { preload: preload, create: create, update: update });

/**
 * Load all base assets for the game
 */
function preload() {
  game.load.audio('meow', 'media/audio/meow.ogg')
  game.load.image('cat', 'media/sprites/Cat.png');
  game.load.image('mouse', 'media/sprites/Mouse.png');
  game.load.image('deadMouse', 'media/sprites/DeadMouse.png');
  game.load.image('tileFloor', 'media/sprites/TileFloor.png');
}

/**
 * Setup the initial state of the game
 */
function create() {
  var floorImage = game.cache.getImage('tileFloor');
  for (var currentx = 0; currentx < game.width; currentx += floorImage.width) {
    for (var currenty = 0; currenty < game.height; currenty += floorImage.height) {
      game.add.image(currentx, currenty, 'tileFloor');
    }
  }

  var catImage = game.cache.getImage('cat');
  game.add.sprite(randomX(game, catImage), randomY(game, catImage), 'cat');

  var mice = game.add.group();
  var mouseImage = game.cache.getImage('mouse');
  for (var currentMouse = 0; currentMouse < 20; currentMouse++) {
    mice.create(randomX(game, mouseImage), randomY(game, mouseImage), 'mouse');
  }

  game.sound.play('meow');
}

/**
 * Handle game updates
 */
function update() {
}

/**
 * Random X coordinate where an image can be placed and be entirely in the game
 *
 * @param {Object} game The Phaser game Object
 * @param {Object} image Image that needs to be placed
 * @return {Number} Random number between 0 and the game width minus
 *  the image width
 */
function randomX(game, image) {
  return chance.integer({min: 0, max: game.width - image.width})
}

/**
 * Random Y coordinate where an image can be placed and be entirely in the game
 *
 * @param Object game The Phaser game Object
 * @param Object image Image that needs to be placed
 * @return {Number} Random number between 0 and the game height minus
 *  the image height
 */
function randomY(game, image) {
  return chance.integer({min: 0, max: game.height - image.height})
}
