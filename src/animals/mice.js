var MOUSE  = require('constants/media').MOUSE;
var Random = require('random');


function Mice(game, mouseCount) {
  this.group = game.add.group();
  this.group.enableBody = true;

  var image = game.cache.getImage(MOUSE);
  for (var currentMouse = 0; currentMouse < mouseCount; currentMouse++) {
    var mouse = this.group.create(
      Random.x(game, image),
      Random.y(game, image),
      MOUSE);
    mouse.anchor.setTo(.5, .5);
    mouse.body.collideWorldBounds = true;

    mouse.rotation = Math.random() * (2 * Math.PI);
    mouse.body.velocity = game.physics.arcade
                              .velocityFromRotation(mouse.rotation, 25, null);
  }
}

module.exports = Mice;
