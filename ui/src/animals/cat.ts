import Media  from '../constants/media';
import Random from '../tools/random';


export default class Cat {

  private sprite: Phaser.Sprite;

  constructor(game: Phaser.Game, private speed: number) {
    const image = game.cache.getImage(Media.CAT);
    this.sprite = game.add.sprite(Random.x(game, image),
                                  Random.y(game, image),
                                  Media.CAT);
    this.sprite.anchor.setTo(.5, .5);

    game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
  }

  public getSprite(): Phaser.Sprite {
    return this.sprite;
  }

  public move(keys: Phaser.CursorKeys) {
    const velocity = this.getVelocity(keys);
    if (velocity.isZero()) {
      if (!this.sprite.body.velocity.isZero()) {
        this.sprite.body.velocity = velocity;
      }
    }
    else {
      this.adjustCat(velocity);
    }
  }

  private getVelocity({up, down, left, right}: Phaser.CursorKeys) {
    const velocity = new Phaser.Point(0, 0);

    if      (left.isDown)  velocity.x = -this.speed;
    else if (right.isDown) velocity.x = this.speed;

    if      (up.isDown)   velocity.y = -this.speed;
    else if (down.isDown) velocity.y = this.speed;

    return velocity;
  }

  private adjustCat(velocity: Phaser.Point) {
    const rotation = Math.atan2(velocity.y, velocity.x);
    if (this.sprite.rotation !== rotation) {
      this.sprite.rotation = rotation;
    }
    this.sprite.game.physics.arcade
      .velocityFromRotation(rotation, this.speed, this.sprite.body.velocity);
  }
}
