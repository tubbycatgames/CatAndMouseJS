var CAT    = require('constants/media').CAT;
var Random = require('tools/random');


function Cat(game) {
  this._velocity = 150;
  
  var image = game.cache.getImage(CAT);
  this.sprite = game.add.sprite(
    Random.x(game, image),
    Random.y(game, image),
    CAT);
  this.sprite.anchor.setTo(.5, .5);

  game.physics.arcade.enable(this.sprite);
  this._body = this.sprite.body;
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

  if (!this._body.velocity.isZero()) {
    var rotation = Math.atan2(this._body.velocity.y, this._body.velocity.x);
    if (this.sprite.rotation != rotation) {
      this.sprite.rotation = rotation;
    }
  }
};

module.exports = Cat;
