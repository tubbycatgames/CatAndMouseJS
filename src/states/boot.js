var LOAD = require('constants/state').LOAD;


module.exports = {
  create: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.state.start(LOAD);
  }
}
