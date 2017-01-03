import textFormat from '../constants/format';


export default class Score {

  private score: number = 0;
  private scoreText: Phaser.Text;
  private miceLeft: Phaser.Text;
  private timer: Phaser.Text;

  constructor(private game: Phaser.Game, private mice: Phaser.Group) {
    this.scoreText = this.game.add.text(20, 20, 'Score: 0', textFormat);
    this.miceLeft = this.game.add.text(this.scoreText.x,
                                       this.scoreText.bottom,
                                       `${this.mice.countLiving()} Mice Left`,
                                       textFormat);
    this.timer = this.game.add.text(this.miceLeft.x,
                                    this.miceLeft.bottom,
                                    `${this.seconds()} Seconds Left`,
                                    textFormat);
  }

  update() {
    this.timer.setText(`${this.seconds()} Seconds Left`);
  }

  increase() {
    this.scoreText.setText(`Score: ${this.score += 10}`);
    this.miceLeft.setText(`${this.mice.countLiving()} Mice Left`);
  }

  private seconds() {
    return Phaser.Math.fuzzyFloor(this.game.time.events.duration / 1000);
  }
}
