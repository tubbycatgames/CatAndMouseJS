import KeyBinder from '../tools/key_binder';
import Menu from '../tools/menu';
import States from '../constants/state';


export default class MenuState extends Phaser.State {

  public create() {
    const menu = new Menu(this.game);

    menu.addTitle('Cat And Mouse',);
    menu.addTextRow('Press Spacebar To Start Hunting!');
    menu.addTextRow('Press C To See Controls');

    const keyBinder = new KeyBinder(this.game);
    keyBinder.bindKeyToState(Phaser.KeyCode.SPACEBAR, States.PLAY);
    keyBinder.bindKeyToState(Phaser.KeyCode.C, States.CONTROLS);
  }
}
