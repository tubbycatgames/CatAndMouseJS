var Media = require('constants/media');
var PLAY = require('constants/state').PLAY;


module.exports = {
  preload: function() {
    this.game.load.image(Media.CAT,        'media/sprites/Cat.png');
    this.game.load.image(Media.DEAD_MOUSE, 'media/sprites/DeadMouse.png');
    this.game.load.image(Media.FLOOR,      'media/sprites/TileFloor.png');
    this.game.load.audio(Media.MEOW,       'media/audio/meow.ogg')
    this.game.load.image(Media.MOUSE,      'media/sprites/Mouse.png');
  },

  create: function() {
    this.game.state.start(PLAY);
  }
};
