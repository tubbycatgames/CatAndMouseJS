import textFormat from '../constants/format';


export default class Score {

  private _score: number = 0;
  private _scoreText: Phaser.Text;

  constructor(game: Phaser.Game) {
    this._scoreText = game.add.text(20, 20, 'Score: 0', textFormat);
  }

  update() {
    this._scoreText.text = `Score: ${this._score += 10}`;
  }
}
