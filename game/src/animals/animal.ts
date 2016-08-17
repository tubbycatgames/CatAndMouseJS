export default class Animal {

  static getVelocity(animal: Phaser.Sprite, speed: number) {
    return animal.game.physics.arcade.velocityFromRotation(animal.rotation,
                                                           speed, null);
  }
}
