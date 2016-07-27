var Media = require('constants/media');
var PLAY  = require('constants/state').PLAY;


module.exports = {
  preload: function() {
    this.load.audio(Media.MEOW,       'media/audio/meow.ogg');

    this.load.image(Media.CAT,        'media/sprites/Cat.png');
    this.load.image(Media.DEAD_MOUSE, 'media/sprites/DeadMouse.png');
    this.load.image(Media.FLOOR,      'media/sprites/TileFloor.png');
    this.load.image(Media.MOUSE,      'media/sprites/Mouse.png');
  },

  create: function() {
    this.state.start(PLAY);
  }
};
