import Format from '../constants/format';


export default class Menu {

  private rows: Phaser.Text[] = [];
  private spacing: number = 10;

  constructor(private game: Phaser.Game) {}

  public addTitle(text: string) {
    const title = this.game.add.text(this.game.world.centerX,
                                     this.game.world.centerY / 2,
                                     text, Format.MENU_TITLE);
    title.anchor.setTo(.5, .5);
    this.rows.push(title);
  }

  public addRow(text: string, format: Object = Format.MENU_STANDARD) {
    if (this.rows.length == 0) {
      this.addTitle(text);
    }
    else {
      const y = this.rows[this.rows.length - 1].bottom + this.spacing;
      const row = this.game.add.text(this.game.world.centerX, y,
                                     text, format);
      row.anchor.setTo(.5, .5);
      this.rows.push(row);
    }
  }

  public addHelpRow(text: string) {
    this.addRow(text, Format.MENU_HELP);
  }
}