import Media from  '../constants/media';
import Random from '../tools/random';


export default class Mice {

  public group: Phaser.Group;

  constructor(game: Phaser.Game,
              private _velocity: number,
              mouseCount: number) {
    this.group = game.add.group();
    this.group.enableBody = true;

    const image = game.cache.getImage(Media.MOUSE);
    for (let currentMouse = 0; currentMouse < mouseCount; currentMouse++) {
      const mouse = this.group.create(
        Random.x(game, image),
        Random.y(game, image),
        Media.MOUSE);
      mouse.anchor.setTo(.5, .5);

      mouse.rotation = Math.random() * (2 * Math.PI);
      mouse.body.velocity = game.physics.arcade
                    .velocityFromRotation(mouse.rotation, this._velocity, null);
      mouse.body.collideWorldBounds = true;
      mouse.body.onWorldBounds = new Phaser.Signal();
      mouse.body.onWorldBounds.add(redirectMouse, this);
    }
  }
}

function redirectMouse(mouse: Phaser.Sprite, up: boolean, down: boolean,
                                             left: boolean, right: boolean) {
  let range = [0, 0];
  if (up) {
    range = [15, 165];
  }
  else if (down) {
    range = [-165, -15];
  }
  else if (left) {
    range = [-75, 75];
  }
  else if (right) {
    range = [105, 255];
  }
  mouse.rotation = mouse.game.rnd.integerInRange(range[0], range[1]) *
                   (Math.PI/180);
  mouse.body.velocity = mouse.game.physics.arcade
                    .velocityFromRotation(mouse.rotation, this._velocity, null);
}
