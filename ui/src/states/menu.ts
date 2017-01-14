import Menu from '../tools/menu';
import States from '../constants/state';


export default class MenuState extends Phaser.State {

  public create() {
    const menu = new Menu(this.game);

    menu.addTitle('Cat And Mouse',);
    menu.addRow('Press Spacebar To Start Hunting!');
    menu.addRow('Press C To See Controls');

    menu.bindKey(Phaser.KeyCode.SPACEBAR,
                () => {this.game.state.start(States.PLAY);});
    menu.bindKey(Phaser.KeyCode.C,
                 () => {this.game.state.start(States.CONTROLS);});
  }
}
