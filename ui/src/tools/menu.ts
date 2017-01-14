import Format from '../constants/format';


export default class Menu {

  private rows: Phaser.Text[] = [];
  private spacing: number = 10;

  constructor(private game: Phaser.Game) {}

  public addTitle(text: string) {
    const title = this.game.add.text(this.game.world.centerX,
                                     this.game.world.centerY / 2,
                                     text, Format.TITLE);
    title.anchor.setTo(.5, .5);
    this.rows.push(title);
  }

  public addRow(text: string) {
    if (this.rows.length == 0) {
      this.addTitle(text);
    }
    else {
      const y = this.rows[this.rows.length - 1].bottom + this.spacing;
      const row = this.game.add.text(this.game.world.centerX, y,
                                     text, Format.STANDARD);
      row.anchor.setTo(.5, .5);
      this.rows.push(row);
    }
  }

  public bindKey(key: number, action: Function) {
    const newKey = this.game.input.keyboard.addKey(key);
    this.game.input.keyboard.addKeyCapture(key);
    newKey.onUp.add(action, this);
  }
}
