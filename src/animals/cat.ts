import Media  from '../constants/media';
import Random from '../tools/random';


export default class Cat {

  public sprite: Phaser.Sprite;

  constructor (public game: Phaser.Game, private _speed: number = 150) {
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
    const velocity = new Phaser.Point(0, 0);
    if (left.isDown) {
      velocity.x = -this._speed;
    }
    else if (right.isDown) {
      velocity.x = this._speed;
    }

    if (up.isDown) {
      velocity.y = -this._speed;
    }
    else if (down.isDown) {
      velocity.y = this._speed;
    }

    if (!velocity.isZero()) {
      const rotation = Math.atan2(velocity.y, velocity.x);
      this.sprite.body.velocity = this.game.physics.arcade
                             .velocityFromRotation(rotation, this._speed, null);
      if (this.sprite.rotation != rotation) {
        this.sprite.rotation = rotation;
      }
    }
  }

  stop() {
    this.sprite.body.velocity.setTo(0, 0);
  }
}
