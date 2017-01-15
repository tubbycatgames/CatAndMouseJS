import Format from '../constants/format';


export default class Menu {

  private rows: Phaser.Text[] = [];

  constructor(private game: Phaser.Game, private spacing: number = 10) {}

  public addTitle(text: string) {
    this.addRow(this.game.world.centerY, text, Format.MENU_TITLE);
  }

  public addTextRow(text: string, format: Object = Format.MENU_STANDARD) {
    if (this.rows.length == 0) {
      this.addTitle(text);
    }
    else {
      const y = this.rows[this.rows.length - 1].bottom + this.spacing;
      this.addRow(y, text, format);
    }
  }

  public addHelpRow(text: string) {
    this.addTextRow(text, Format.MENU_HELP);
  }

  public addBlankRow() {
    this.addTextRow('');
  }

  private addRow(y: number, text: string, format: Object) {
    const row = this.game.add.text(this.game.world.centerX, y, text, format);
    row.anchor.setTo(.5, .5);
    this.rows.push(row);
  }
}
