export default class Random {

  static x(game: Phaser.Game, image: HTMLImageElement): number {
    const halfWidth = image.width / 2;
    return game.rnd.integerInRange(halfWidth, game.width - halfWidth);
  }

  static y(game: Phaser.Game, image: HTMLImageElement): number {
    const halfHeight = image.height / 2;
    return game.rnd.integerInRange(halfHeight, game.height - halfHeight);
  }
}
