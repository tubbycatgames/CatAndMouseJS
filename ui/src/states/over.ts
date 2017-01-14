import Menu from '../tools/menu';
import States from '../constants/state';


export default class OverState extends Phaser.State {

  public create() {
    const menu = new Menu(this.game);

    menu.addTitle('Game Over');
    menu.addRow('Press Spacebar To Restart!');

    menu.bindKey(Phaser.KeyCode.SPACEBAR,
                 () => {this.game.state.start(States.PLAY);});
  }
}
