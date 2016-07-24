var Constants = require('media_constants');
var Random = require('random');

function Cat(game) {
  this._velocity = 150;
  this._sprite = game.cache.getImage(Constants.CAT);
  this.cat = game.add.sprite(
    Random.randomX(game, this._sprite),
    Random.randomY(game, this._sprite),
    Constants.CAT);

  game.physics.arcade.enable(this.cat);
  this._body = this.cat.body;
  this._body.collideWorldBounds =true;
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
}

module.exports = Cat;
