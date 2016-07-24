var Chance = require('chance');
var chance = new Chance();

var Constants = require('media_constants');
var Random = require('random');

function Mice(game) {
  this.mice = game.add.group();
  this.mice.enableBody = true;

  this._mouseSprite = game.cache.getImage(Constants.Mouse);
  for (var currentMouse = 0; currentMouse < 20; currentMouse++) {
    mouse = this.mice.create(
      Random.randomX(game, this._mouseSprite),
      Random.randomY(game, this._mouseSprite),
      Constants.MOUSE);
    mouse.body.collideWorldBounds = true;

    angle = chance.integer({min: 0, max: 360})
    mouse.angle = angle + 180
    mouse.body.velocity = game.physics.arcade.velocityFromAngle(angle, 25, null)
  }
}

module.exports = Mice;
