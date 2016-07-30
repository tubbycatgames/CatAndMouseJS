function _random(max: number) {
    return Math.random() * max;
}

function x(game: Phaser.Game, image: HTMLImageElement) {
  return _random(game.width - image.width);
}

function y(game: Phaser.Game, image: HTMLImageElement) {
  return _random(game.height - image.height);
}

export default {x: x, y: y};
