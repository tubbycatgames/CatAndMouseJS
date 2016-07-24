var FLOOR = require('media_constants').FLOOR;


function Floor(game) {
  var image = game.cache.getImage(FLOOR);
  for (var x = 0; x < game.width; x += image.width) {
    for (var y = 0; y < game.height; y += image.height) {
      game.add.image(x, y, FLOOR);
    }
  }
}

module.exports = Floor;
