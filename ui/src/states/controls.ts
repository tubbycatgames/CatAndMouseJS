import Menu from '../tools/menu';
import States from '../constants/state';


export default class ControlsState extends Phaser.State {

  public create() {
    const menu = new Menu(this.game);

    menu.addTitle('Controls');
    menu.addRow('Press Esc Button To Return To Menu');
    menu.addRow('Left Key:  Go Left');
    menu.addRow('Right Key: Go Right');
    menu.addRow('Up Key:    Go Up');
    menu.addRow('Down Key:  Go Down');
    menu.addRow('Spacebar:  Pause');

    menu.bindKey(Phaser.KeyCode.ESC,
                 () => {this.game.state.start(States.MENU);});
  }
}
