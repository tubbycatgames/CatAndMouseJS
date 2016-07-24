var chance = require('chance').Chance();

var MOUSE  = require('media_constants').MOUSE;
var Random = require('random');


function Mice(game, mouseCount) {
  this.mice = game.add.group();
  this.mice.enableBody = true;

  var sprite = game.cache.getImage(MOUSE);
  for (var currentMouse = 0; currentMouse < mouseCount; currentMouse++) {
    var mouse = this.mice.create(
      Random.x(game, sprite),
      Random.y(game, sprite),
      MOUSE);
    mouse.body.collideWorldBounds = true;

    var angle = chance.integer({min: 0, max: 360});
    mouse.angle = angle + 180;
    mouse.body.velocity = game.physics.arcade
                              .velocityFromAngle(angle, 25, null);
  }
}

module.exports = Mice;
