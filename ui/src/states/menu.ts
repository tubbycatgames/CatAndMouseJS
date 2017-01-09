import Format from '../constants/format';
import States from '../constants/state';


export default class MenuState extends Phaser.State {

  public create() {
    const centerX = this.world.centerX;
    const title = this.add.text(centerX, this.world.centerY,
                                'Cat And Mouse',
                                Format.TITLE);
    title.anchor.setTo(.5, .5);

    const startGame = this.add.text(centerX, title.bottom,
                                    'Press Spacebar To Start Hunting!',
                                    Format.STANDARD);
    startGame.anchor.setTo(.5, .5);

    const spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    spacebar.onUp.add(() => {this.game.state.start(States.PLAY);}, this);
  }
}
