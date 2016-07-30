export default class OverState extends Phaser.State {
  create() {
    this.add.text(this.world.centerX, this.world.centerY, 'Game Over',
                 {fontSize: '20px', fill:'#003F87'})
        .anchor.setTo(.5, .5);
  }
}
