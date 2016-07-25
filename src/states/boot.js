var LOAD = require('constants/state').LOAD;


module.exports = {
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.state.start(LOAD);
  }
}
