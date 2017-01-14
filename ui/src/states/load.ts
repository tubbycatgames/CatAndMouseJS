import Media  from '../constants/media';
import States from '../constants/state';


export default class LoadState extends Phaser.State {

  public preload() {
    this.load.audio(Media.MEOW, 'media/audio/meow.ogg');

    this.load.image(Media.CAT,        'media/sprites/Cat.png');
    this.load.image(Media.FLOOR,      'media/sprites/TileFloor.png');

    this.load.image(Media.MICE.BLACK, 'media/sprites/BlackMouse.png');
    this.load.image(Media.MICE.BROWN, 'media/sprites/BrownMouse.png');
    this.load.image(Media.MICE.DEAD,  'media/sprites/DeadMouse.png');
    this.load.image(Media.MICE.GREY,  'media/sprites/GreyMouse.png');
    this.load.image(Media.MICE.WHITE, 'media/sprites/WhiteMouse.png');
  }

  public create() {
    this.game.state.start(States.MENU);
  }
}
