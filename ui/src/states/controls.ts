import KeyBinder from '../tools/key_binder';
import Menu from '../tools/menu';
import States from '../constants/state';


export default class ControlsState extends Phaser.State {

  public create() {
    const menu = new Menu(this.game);

    menu.addTitle('Controls');
    menu.addHelpRow('Press Esc Button To Return To Menu');

    menu.addRow('Left Key:  Go Left');
    menu.addRow('Right Key: Go Right');
    menu.addRow('Up Key:    Go Up');
    menu.addRow('Down Key:  Go Down');

    menu.addRow('Spacebar:  Pause');
    menu.addRow('R Key:     Restart');
    menu.addRow('Esc Key:   Return To Main Menu');

    const keyBinder = new KeyBinder(this.game);
    keyBinder.bindKeyToState(Phaser.KeyCode.ESC, States.MENU);
  }
}
