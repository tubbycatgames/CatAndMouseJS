import Media  from '../constants/media';
import Random from '../tools/random';


export default class Cat {

  public sprite: Phaser.Sprite;

  constructor (game: Phaser.Game, private _velocity: number = 150) {
    const image = game.cache.getImage(Media.CAT);
    this.sprite = game.add.sprite(
      Random.x(game, image),
      Random.y(game, image),
      Media.CAT);
    this.sprite.anchor.setTo(.5, .5);

    game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
  }

  move({up, down, left, right}: Phaser.CursorKeys) {
    this.sprite.body.velocity.x = 0;
    if (left.isDown) {
      this.sprite.body.velocity.x = -this._velocity;
    }
    else if (right.isDown) {
      this.sprite.body.velocity.x = this._velocity;
    }

    this.sprite.body.velocity.y = 0;
    if (up.isDown) {
      this.sprite.body.velocity.y = -this._velocity;
    }
    else if (down.isDown) {
      this.sprite.body.velocity.y = this._velocity;
    }

    if (!this.sprite.body.velocity.isZero()) {
      const rotation = Math.atan2(this.sprite.body.velocity.y,
                                  this.sprite.body.velocity.x);
      if (this.sprite.rotation != rotation) {
        this.sprite.rotation = rotation;
      }
    }
  }
}
