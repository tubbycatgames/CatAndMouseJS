var Constants = require('media_constants');
var Random = require('random');

function Cat(game) {
  this.sprite = game.cache.getImage(Constants.CAT);
  game.add.sprite(
    Random.randomX(game, this.sprite),
    Random.randomY(game, this.sprite),
    Constants.CAT);
}

module.exports = Cat;
