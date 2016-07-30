import Media  from '../constants/media';
import Random from '../tools/random';


export default class Cat {

  public sprite: Phaser.Sprite;

  constructor (game: Phaser.Game, private _velocity: number) {
    const image = game.cache.getImage(Media.CAT);
    this.sprite = game.add.sprite(
      Random.x(game, image),
      Random.y(game, image),
      Media.CAT);
    this.sprite.anchor.setTo(.5, .5);

    game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
  }

  public move(cursors: Phaser.CursorKeys) {
    this.sprite.body.velocity.x = 0;
    if (cursors.left.isDown) {
      this.sprite.body.velocity.x = -this._velocity;
    }
    else if (cursors.right.isDown) {
      this.sprite.body.velocity.x = this._velocity;
    }

    this.sprite.body.velocity.y = 0;
    if (cursors.up.isDown) {
      this.sprite.body.velocity.y = -this._velocity;
    }
    else if (cursors.down.isDown) {
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
