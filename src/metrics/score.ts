export default class Score {

  private _score: number = 0;
  private _scoreText: Phaser.Text;

  constructor(game: Phaser.Game) {
    this._scoreText = game.add.text(20, 20, 'Score: 0',
                                    {fontSize: '20px', fill:'#003F87'});
  }

  update() {
    this._scoreText.text = `Score: ${this._score += 10}`;
  }
}
