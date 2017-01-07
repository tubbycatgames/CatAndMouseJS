import States from '../constants/state';
import textFormat from '../constants/format';


export default class MeueState extends Phaser.State {

  create() {
    const startGame = this.add.text(this.world.centerX, this.world.centerY,
                                    'Play Game', textFormat);
    startGame.anchor.setTo(.5, .5);

    const spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    spacebar.onUp.add(() => {this.game.state.start(States.PLAY);}, this);
  }
}
