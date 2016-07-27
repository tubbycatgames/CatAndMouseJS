module.exports = {
  create: function() {
    text = this.add.text(this.world.centerX, this.world.centerY, 'Game Over',
                         {fontSize: '20px', fill:'#003F87'});
    text.anchor.setTo(.5, .5);
  }
};
