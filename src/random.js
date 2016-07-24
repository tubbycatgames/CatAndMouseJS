var chance = require('chance').Chance();

function _random(max) {
    return chance.integer({min:0, max: max})
}

function x(game, image) {
  return _random(game.width - image.width);
}

function y(game, image) {
  return _random(game.height - image.height);
}

module.exports = {x: x, y: y};
