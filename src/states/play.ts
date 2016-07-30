import Cat       from '../animals/cat';
import Floor     from '../inanimate/floor';
import Media     from '../constants/media';
import Mice      from '../animals/mice';
import Score     from '../metrics/score';
import States    from '../constants/state';


export default class PlayState extends Phaser.State {
  private score: Score;
  private cat: Cat;
  private mice: Mice;
  private cursors: Phaser.CursorKeys;

  create() {
    Floor.render(this.game);
    this.score = new Score(this.game);
    this.cat   = new Cat(this.game);
    this.mice  = new Mice(this.game);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.sound.play(Media.MEOW);
  }

  update() {
    this.cat.move(this.cursors);
    this.physics.arcade.overlap(this.cat.sprite, this.mice.group,
                                this.killMouse, null, this);
  }

  killMouse(player: Phaser.Sprite, mouse: Phaser.Sprite) {
    mouse.kill();
    this.score.update();

    if (this.mice.group.countLiving() == 0) {
      this.game.state.start(States.OVER);
    }
  }
}
