export default class Random {

  public static x(game: Phaser.Game, image: HTMLImageElement): number {
    return Random.random(game, game.width, image.width / 2);
  }

  public static y(game: Phaser.Game, image: HTMLImageElement): number {
    return Random.random(game, game.height, image.height / 2);
  }

  private static random(game: Phaser.Game,
                        gameDim: number, objectDim: number): number {
    return game.rnd.between(objectDim, gameDim - objectDim);
  }
}
