import textFormat from '../constants/format';


export default class Score {

  private score: number = 0;
  private scoreText: Phaser.Text;
  private miceLeft: Phaser.Text;
  private timer: Phaser.Text;

  constructor(private game: Phaser.Game, private mice: Phaser.Group) {
    this.scoreText = this.game.add.text(20, 20, 'Score: 0', textFormat);
    this.miceLeft = this.game.add.text(this.scoreText.x,
                                       this.scoreText.y + this.scoreText.height,
                                       `${this.mice.countLiving()} Mice Left`,
                                       textFormat);
    this.timer = this.game.add.text(this.miceLeft.x,
                                    this.miceLeft.y + this.miceLeft.height,
                                    `${this.seconds()} Seconds Left`,
                                    textFormat);
  }

  update() {
    this.timer.text = `${this.seconds()} Seconds Left`;
  }

  increase() {
    this.scoreText.text = `Score: ${this.score += 10}`;
    this.miceLeft.text  = `${this.mice.countLiving()} Mice Left`;
  }

  private seconds() {
    return Phaser.Math.fuzzyFloor(this.game.time.events.duration / 1000);
  }
}
