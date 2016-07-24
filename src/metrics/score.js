function Score(game) {
  this._score = 0;
  this._scoreText = game.add.text(20, 20, 'Score: 0', {
    fontSize: '20px', fill: '#003F87'
  });
}

Score.prototype.update = function () {
  this._score += 10;
  this._scoreText.text = 'Score: ' + this._score;
}

module.exports = Score;
