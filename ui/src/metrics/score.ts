import Format from '../constants/format';


export default class Score {

  private score: number = 0;
  private scoreText: Phaser.Text;
  private miceLeft: Phaser.Text;
  private timer: Phaser.Text;

  constructor(private game: Phaser.Game, private remaining: number) {
    this.scoreText = this.game.add.text(20, 20, 'Score: 0', Format.METRICS);
    this.miceLeft = this.game.add.text(this.scoreText.x,
                                       this.scoreText.bottom,
                                       `${this.remaining} Mice Left`,
                                       Format.METRICS);
    this.timer = this.game.add.text(this.miceLeft.x,
                                    this.miceLeft.bottom,
                                    `${this.seconds()} Seconds Left`,
                                    Format.METRICS);
  }

  public update() {
    this.timer.setText(`${this.seconds()} Seconds Left`);
  }

  public increase() {
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);

    this.remaining -= 1;
    this.miceLeft.setText(`${this.remaining} Mice Left`);
  }

  private seconds() {
    return Phaser.Math.fuzzyFloor(this.game.time.events.duration / 1000);
  }
}
