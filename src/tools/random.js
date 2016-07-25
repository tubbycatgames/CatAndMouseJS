function _random(max) {
    return Math.random() * max;
}

function x(game, image) {
  return _random(game.width - image.width);
}

function y(game, image) {
  return _random(game.height - image.height);
}

module.exports = {x: x, y: y};
