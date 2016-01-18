var Constants = require('media_constants');
var Random = require('random');

function Mice(game) {
  this.mice = game.add.group();
  this.mouseSprite = game.cache.getImage(Constants.Mouse);
  for (var currentMouse = 0; currentMouse < 20; currentMouse++) {
    this.mice.create(
      Random.randomX(game, this.mouseSprite),
      Random.randomY(game, this.mouseSprite),
      Constants.MOUSE);
  }
}

module.exports = Mice;
