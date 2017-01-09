import Format from '../constants/format';
import States from '../constants/state';


export default class OverState extends Phaser.State {

  public create() {
    const centerX = this.world.centerX;

    const overText = this.add.text(centerX, this.world.centerY,
                                   'Game Over', Format.STANDARD);
    overText.anchor.setTo(.5, .5);

    const restartText = this.add.text(centerX, overText.bottom + 10,
                                      'Press Spacebar To Restart!',
                                      Format.STANDARD);
    restartText.anchor.setTo(.5, .5);

    const spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    spacebar.onUp.add(() => {this.game.state.start(States.PLAY);}, this);
  }
}
