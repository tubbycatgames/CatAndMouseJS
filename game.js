var game = new Phaser.Game(800, 600, Phaser.AUTO, '',
  { preload: preload, create: create, update: update });

function preload() {
  game.load.image('cat', 'media/sprites/Cat.png');
  game.load.image('mouse', 'media/sprites/Mouse.png');
  game.load.image('deadMouse', 'media/sprites/DeadMouse.png');
  game.load.image('tileFloor', 'media/sprites/TileFloor.png');
}

function create() {
  var floor = game.add.sprite(0, 0, 'tileFloor');
  for (var currentx = 0; currentx < game.width; currentx += floor.width) {
    for (var currenty = 0; currenty < game.height; currenty += floor.height) {
      game.add.sprite(currentx, currenty, 'tileFloor');
    }
  }
  game.add.sprite(0, 0, 'cat');
  game.add.sprite(30, 30, 'mouse');
  game.add.sprite(60, 60, 'deadMouse');
}

function update() {
}
