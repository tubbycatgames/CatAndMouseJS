var Chance = require('chance');
var chance = new Chance();
/**
 * Random X coordinate where an image can be placed and be entirely in the game
 *
 * @param {Object} game The Phaser game Object
 * @param {Object} image Image that needs to be placed
 * @return {Number} Random number between 0 and the game width minus
 *  the image width
 */
function randomX(game, image) {
  return chance.integer({min: 0, max: game.width - image.width});
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
  return chance.integer({min: 0, max: game.height - image.height});
}

module.exports = {
  randomX: randomX,
  randomY: randomY
};
