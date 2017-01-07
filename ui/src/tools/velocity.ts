export default class Velocity {

  public static getFromRotation(sprite: Phaser.Sprite, speed: number) {
    return sprite.game.physics.arcade.velocityFromRotation(sprite.rotation,
                                                           speed, null);
  }
}
