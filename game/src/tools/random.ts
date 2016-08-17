export default class Random {

  private static random(game: Phaser.Game, gameDim: number, objectDim: number) {
    return game.rnd.between(objectDim, gameDim - objectDim);
  }

  static x(game: Phaser.Game, image: HTMLImageElement): number {
    return Random.random(game, game.width, image.width / 2);
  }

  static y(game: Phaser.Game, image: HTMLImageElement): number {
    return Random.random(game, game.height, image.height / 2);
  }
}
