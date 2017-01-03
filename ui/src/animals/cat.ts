import Animal from './animal';
import Media  from '../constants/media';
import Random from '../tools/random';


export default class Cat {

  public sprite: Phaser.Sprite;

  constructor(game: Phaser.Game, private speed: number = 150) {
    const image = game.cache.getImage(Media.CAT);
    this.sprite = game.add.sprite(Random.x(game, image),
                                  Random.y(game, image),
                                  Media.CAT);
    this.sprite.anchor.setTo(.5, .5);

    game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
  }

  move({up, down, left, right}: Phaser.CursorKeys) {
    this.sprite.body.velocity.setTo(0, 0);

    const velocity = new Phaser.Point(0, 0);

    if      (left.isDown)  velocity.x = -this.speed;
    else if (right.isDown) velocity.x = this.speed;

    if      (up.isDown)   velocity.y = -this.speed;
    else if (down.isDown) velocity.y = this.speed;

    if (!velocity.isZero()) {
      const rotation = Math.atan2(velocity.y, velocity.x);
      if (this.sprite.rotation !== rotation) {
        this.sprite.rotation = rotation;
      }
      this.sprite.body.velocity = Animal.getVelocity(this.sprite, this.speed);
    }
  }
}
