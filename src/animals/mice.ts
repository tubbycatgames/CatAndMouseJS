import * as _ from 'lodash';

import Media         from '../constants/media';
import Random        from '../tools/random';
import VelocityCache from '../tools/velocity_cache';


export default class Mice {

  group: Phaser.Group;

  private _velocities: VelocityCache = new VelocityCache()

  constructor(game: Phaser.Game,
              private _speed: number = 50,
              mouseCount: number = 20) {
    this.group = game.add.group();
    this.group.enableBody = true;

    const image = game.cache.getImage(Media.MOUSE);
    for (let count of _.range(0, mouseCount)) {
      const mouse = this.group.create(
        Random.x(game, image),
        Random.y(game, image),
        Media.MOUSE);
      mouse.anchor.setTo(.5, .5);

      mouse.rotation = Math.random() * (2 * Math.PI);
      mouse.body.velocity = game.physics.arcade
                       .velocityFromRotation(mouse.rotation, this._speed, null);
      this._velocities.set(mouse);

      mouse.body.collideWorldBounds = true;
      mouse.body.onWorldBounds = new Phaser.Signal();
      mouse.body.onWorldBounds.add(this.redirectFromWall, this);
    }
  }

  start() {
    this.group.forEachAlive((mouse: Phaser.Sprite) => {
      mouse.body.velocity = this._velocities.get(mouse).velocity.clone();
    }, this);
  }

  stop() {
    this.group.forEachAlive((mouse: Phaser.Sprite) => {
      this._velocities.set(mouse);
      mouse.body.velocity.setTo(0, 0);
    }, this);
  }

  private redirectFromWall(mouse: Phaser.Sprite, up: boolean, down: boolean,
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
                       .velocityFromRotation(mouse.rotation, this._speed, null);
    this._velocities.set(mouse);
  }
}
