import Media from '../constants/media';
import States from '../constants/state';


export default class LoadState extends Phaser.State {

  private audioBase: string = 'media/audio/';
  private imageBase: string = 'media/sprites/';

  public preload() {
    this.loadAudio();
    this.loadImages();
  }

  public create() {
    this.game.state.start(States.MENU);
  }

  private loadAudio() {
    this.loadAudioFile(Media.MEOW, 'meow.ogg');
  }

  private loadAudioFile(key: string, filename: string) {
    this.load.audio(key, this.audioBase + filename);
  }

  private loadImages() {
    this.loadSpritesheet(Media.CAT, 'Cat.png', 35, 20);

    this.loadImageFile(Media.FLOOR, 'TileFloor.png');

    this.loadImageFile(Media.MICE.BLACK, 'BlackMouse.png');
    this.loadImageFile(Media.MICE.BROWN, 'BrownMouse.png');
    this.loadImageFile(Media.MICE.DEAD, 'DeadMouse.png');
    this.loadImageFile(Media.MICE.GREY, 'GreyMouse.png');
    this.loadImageFile(Media.MICE.WHITE, 'WhiteMouse.png');
  }

  private loadImageFile(key: string, filename: string) {
    this.load.image(key, this.imageBase + filename);
  }

  private loadSpritesheet(key: string, filename: string,
                          width: number, height: number) {
    this.load.spritesheet(key, this.imageBase + filename, width, height);
  }
}
