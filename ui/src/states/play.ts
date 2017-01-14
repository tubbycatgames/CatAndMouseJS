import Cat from '../animals/cat';
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

    this.configurePause();
    this.cursors = this.input.keyboard.createCursorKeys();

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

  private configurePause() {
    this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onUp.add(() => {this.game.paused = !this.game.paused;}, this);
    this.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
  }
}
