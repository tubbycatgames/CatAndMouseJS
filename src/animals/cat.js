var CAT    = require('media_constants').CAT;
var Random = require('random');


function Cat(game) {
  var sprite = game.cache.getImage(CAT);
  this.cat = game.add.sprite(
    Random.x(game, sprite),
    Random.y(game, sprite),
    CAT);

  game.physics.arcade.enable(this.cat);
  this._velocity = 150;
  this._body = this.cat.body;
  this._body.collideWorldBounds = true;
}

Cat.prototype.move = function (cursors) {
  this._body.velocity.x = 0;
  if (cursors.left.isDown) {
    this._body.velocity.x = -this._velocity;
  }
  else if (cursors.right.isDown) {
    this._body.velocity.x = this._velocity;
  }

  this._body.velocity.y = 0;
  if (cursors.up.isDown) {
    this._body.velocity.y = -this._velocity;
  }
  else if (cursors.down.isDown) {
    this._body.velocity.y = this._velocity;
  }
};

module.exports = Cat;
