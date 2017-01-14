import Menu from '../tools/menu';
import States from '../constants/state';


export default class OverState extends Phaser.State {

  public create() {
    const menu = new Menu(this.game);

    menu.addTitle('Game Over');
    menu.addRow('Press Spacebar To Restart!');
    menu.addRow('Press Esc To Return To The Main Menu');

    menu.bindKeyToState(Phaser.KeyCode.SPACEBAR, States.PLAY);
    menu.bindKeyToState(Phaser.KeyCode.ESC, States.MENU);
  }
}
