var MOUSE  = require('constants/media').MOUSE;
var Random = require('tools/random');


function Mice(game, mouseCount) {
  this.group = game.add.group();
  this.group.enableBody = true;
  this.speed = 50;

  var image = game.cache.getImage(MOUSE);
  for (var currentMouse = 0; currentMouse < mouseCount; currentMouse++) {
    var mouse = this.group.create(
      Random.x(game, image),
      Random.y(game, image),
      MOUSE);
    mouse.anchor.setTo(.5, .5);

    mouse.rotation = Math.random() * (2 * Math.PI);
    mouse.body.velocity = game.physics.arcade.velocityFromRotation(
                                              mouse.rotation, this.speed, null);
    mouse.body.collideWorldBounds = true;
    mouse.body.onWorldBounds = new Phaser.Signal();
    mouse.body.onWorldBounds.add(redirectMouse, this);
  }
}

function redirectMouse(mouse, up, down, left, right) {
  var range = [0, 0];
  if (up) {
    range = [15, 165];
  }
  else if (down) {
    range = [-165, -15];
  }
  else if (left) {
    range = [-75, 75];
  }
  else if (right) {
    range = [105, 255];
  }
  mouse.rotation = mouse.game.rnd.integerInRange(range[0], range[1]) *
                   (Math.PI/180);
  mouse.body.velocity = mouse.game.physics.arcade.velocityFromRotation(
                                              mouse.rotation, this.speed, null);
}

module.exports = Mice;
