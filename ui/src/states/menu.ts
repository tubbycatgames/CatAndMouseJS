import States from '../constants/state';
import format from '../constants/format';


export default class MeueState extends Phaser.State {

  public create() {
    const startGame = this.add.text(this.world.centerX, this.world.centerY,
                                    'Play Game', format);
    startGame.anchor.setTo(.5, .5);

    const spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    spacebar.onUp.add(() => {this.game.state.start(States.PLAY);}, this);
  }
}
