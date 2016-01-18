var Constants = require('media_constants');

function Floor(game) {
  this.floorImage = game.cache.getImage(Constants.FLOOR);
  for (var currentx = 0; currentx < game.width; currentx += this.floorImage.width) {
    for (var currenty = 0; currenty < game.height; currenty += this.floorImage.height) {
      game.add.image(currentx, currenty, Constants.FLOOR);
    }
  }
}

module.exports = Floor;
