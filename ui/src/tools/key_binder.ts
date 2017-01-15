export default class KeyBinder {

  constructor(private game: Phaser.Game) {}

  public bindKeyToPause(key: number) {
    this.bindKey(key, () => {this.game.paused = !this.game.paused;});
  }

  public bindKeyToRestart(key: number) {
    this.bindKey(key, () => {this.game.state.restart();});
  }

  public bindKeyToState(key: number, state: string) {
    this.bindKey(key, () => {this.game.state.start(state);});
  }

  public getCursorKeys(): Phaser.CursorKeys {
    return this.game.input.keyboard.createCursorKeys();
  }

  private bindKey(key: number, action: Function) {
    this.game.input.keyboard.addKey(key).onUp.add(action, this);
    this.game.input.keyboard.addKeyCapture(key);
  }
}
