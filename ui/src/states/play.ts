import Cat from '../animals/cat';
import KeyBinder from '../tools/key_binder';
import Media from '../constants/media';
import Mice from '../animals/mice';
import Score from '../metrics/score';
import States from '../constants/state';


export default class PlayState extends Phaser.State {

  private cat: Cat;
  private cursors: Phaser.CursorKeys;
  private mice: Mice;
  private score: Score;

  public create() {
    const catSpeed = 150;
    const mouseSpeed = 50;
    const mouseCount = 20;
    const mouseAwareness = 50;
    const gameMillis = 30000;

    this.game.add.tileSprite(0, 0, this.game.width, this.game.height,
                             Media.FLOOR);

    this.cat   = new Cat(this.game, catSpeed);
    this.mice  = new Mice(this.game, mouseSpeed, mouseCount, mouseAwareness);
    this.score = new Score(this.game, mouseCount);

    this.bindKeys();

    this.sound.play(Media.MEOW);

    this.game.time.events.add(gameMillis, () => {
      this.game.state.start(States.OVER);
    }, this);
  }

  public update() {
    this.cat.move(this.cursors);

    const catSprite = this.cat.getSprite();
    this.mice.move(catSprite);
    this.physics.arcade.overlap(catSprite, this.mice.getMiceGroup(), this.kill,
                                null, this);
    this.score.update();
  }

  private kill(_: Phaser.Sprite, mouse: Phaser.Sprite) {
    this.score.increase();
    const remainingMice = this.mice.kill(mouse);
    if (remainingMice === 0) {
      this.game.state.start(States.OVER, false);
    }
  }

  private bindKeys() {
    const keyBinder = new KeyBinder(this.game);
    keyBinder.bindKeyToPause(Phaser.KeyCode.SPACEBAR);
    keyBinder.bindKeyToRestart(Phaser.KeyCode.R);
    keyBinder.bindKeyToState(Phaser.KeyCode.ESC, States.MENU);
    this.cursors = keyBinder.getCursorKeys();
  }
}
