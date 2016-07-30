import * as _ from 'lodash';

import Media from '../constants/media';


export default function drawFloor(game: Phaser.Game) {
  const image = game.cache.getImage(Media.FLOOR);
  for (let x of _.range(0, game.width, image.width)) {
    for (let y of _.range(0, game.height, image.height)) {
      game.add.image(x, y, Media.FLOOR);
    }
  }
}
