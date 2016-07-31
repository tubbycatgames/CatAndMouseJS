import Cat    from '../animals/cat';
import Floor  from '../inanimate/floor';
import Media  from '../constants/media';
import Mice   from '../animals/mice';
import Score  from '../metrics/score';
import States from '../constants/state';


export default class PlayState extends Phaser.State {

  private pausedState: boolean = false;
  private score: Score;
  private cat: Cat;
  private mice: Mice;
  private spacebar: Phaser.Key;
  private cursors: Phaser.CursorKeys;

  create() {
    Floor.render(this.game);
    this.score = new Score(this.game);
    this.cat   = new Cat(this.game);
    this.mice  = new Mice(this.game);

    this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    this.spacebar.onUp.add(this.handlePause, this);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.sound.play(Media.MEOW);
  }

  update() {
    if (!this.pausedState) {
      this.cat.move(this.cursors);
      this.physics.arcade.overlap(this.cat.sprite, this.mice.group,
                                  this.killMouse, null, this);
    }
  }

  handlePause() {
    this.pausedState = !this.pausedState;
    if (this.pausedState) {
      this.cat.stop();
      this.mice.stop();
    }
    else {
      this.mice.start();
    }
  }

  killMouse(player: Phaser.Sprite, mouse: Phaser.Sprite) {
    mouse.kill();
    this.score.update();

    if (this.mice.group.countLiving() == 0) {
      this.game.state.start(States.OVER);
    }
  }
}
