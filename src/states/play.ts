import Cat    from '../animals/cat';
import Media  from '../constants/media';
import Mice   from '../animals/mice';
import Score  from '../metrics/score';
import States from '../constants/state';


export default class PlayState extends Phaser.State {

  private score: Score;
  private cat: Cat;
  private mice: Mice;
  private cursors: Phaser.CursorKeys;

  create() {
    this.game.add.tileSprite(0, 0, this.game.width, this.game.height,
                             Media.FLOOR);
    this.cat   = new Cat(this.game);
    this.mice  = new Mice(this.game);
    this.score = new Score(this.game, this.mice.group);

    this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onUp.add(() => {
      this.game.paused = !this.game.paused;
    }, this);
    this.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.sound.play(Media.MEOW);

    this.game.time.events.add(30000, () => {
      this.game.state.start(States.OVER);
    }, this);
  }

  update() {
    this.cat.move(this.cursors);
    this.physics.arcade.overlap(this.cat.sprite, this.mice.group,
                                this.kill, null, this);
    this.score.update();
  }

  kill(player: Phaser.Sprite, mouse: Phaser.Sprite) {
    mouse.kill();
    this.score.increase();

    if (this.mice.group.countLiving() == 0) {
      this.game.state.start(States.OVER);
    }
  }
}
