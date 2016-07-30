export default class Random {
  private static _random(max: number): number {
    return Math.random() * max;
  }

  static x(game: Phaser.Game, image: HTMLImageElement): number {
    return Random._random(game.width - image.width);
  }

  static y(game: Phaser.Game, image: HTMLImageElement): number {
    return Random._random(game.height - image.height);
  }
}
