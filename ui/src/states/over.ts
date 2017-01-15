import KeyBinder from '../tools/key_binder';
import Menu from '../tools/menu';
import States from '../constants/state';


export default class OverState extends Phaser.State {

  public create() {
    const menu = new Menu(this.game);

    menu.addTitle('Game Over');
    menu.addRow('Press Spacebar To Restart!');
    menu.addRow('Press Esc To Return To The Main Menu');

    const keyBinder = new KeyBinder(this.game);
    keyBinder.bindKeyToState(Phaser.KeyCode.SPACEBAR, States.PLAY);
    keyBinder.bindKeyToState(Phaser.KeyCode.ESC, States.MENU);
  }
}
