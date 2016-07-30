import Media from '../constants/media';


export default function drawFloor(game: Phaser.Game) {
  const image = game.cache.getImage(Media.FLOOR);
  for (let x = 0; x < game.width; x += image.width) {
    for (let y = 0; y < game.height; y += image.height) {
      game.add.image(x, y, Media.FLOOR);
    }
  }
}
