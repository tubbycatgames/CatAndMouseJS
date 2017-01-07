import Media  from '../constants/media';
import States from '../constants/state';


export default class LoadState extends Phaser.State {

  preload() {
    this.load.audio(Media.MEOW, 'media/audio/meow.ogg');

    this.load.image(Media.CAT,             'media/sprites/Cat.png');
    this.load.image(Media.DEAD_MOUSE,      'media/sprites/DeadMouse.png');
    this.load.image(Media.FLOOR,           'media/sprites/TileFloor.png');
    this.load.image(Media.MOUSE,           'media/sprites/Mouse.png');
    this.load.image(Media.MOUSE_AWARENESS, 'media/sprites/MouseAwareness.png');
  }

  create() {
    this.game.state.start(States.MENU);
  }
}
