import States     from '../constants/state';
import textFormat from '../constants/format';


export default class OverState extends Phaser.State {

  create() {
    const overText = this.add.text(this.world.centerX, this.world.centerY,
                                   'Game Over', textFormat);
    overText.anchor.setTo(.5, .5);

    const restartText = this.add.text(overText.x, overText.bottom,
                                      'Press Space to Restart', textFormat);
    restartText.anchor.setTo(.5, .5);

    const spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    spacebar.onUp.add(() => {this.game.state.start(States.PLAY);}, this);
  }
}
