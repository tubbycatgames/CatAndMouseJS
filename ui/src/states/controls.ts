import KeyBinder from '../tools/key_binder';
import Menu from '../tools/menu';
import States from '../constants/state';


export default class ControlsState extends Phaser.State {

  public create() {
    const menu = new Menu(this.game);

    menu.addTitle('Controls');
    menu.addHelpRow('Press Esc Button To Return To Menu');
    menu.addBlankRow();
    menu.addTextRow('Left Key: Move Left');
    menu.addTextRow('Right Key: Move Right');
    menu.addTextRow('Up Key: Move Up');
    menu.addTextRow('Down Key: Move Down');
    menu.addBlankRow();
    menu.addTextRow('Spacebar: Pause');
    menu.addTextRow('R Key: Restart');
    menu.addTextRow('Esc Key: Return To Main Menu');

    const keyBinder = new KeyBinder(this.game);
    keyBinder.bindKeyToState(Phaser.KeyCode.ESC, States.MENU);
  }
}
