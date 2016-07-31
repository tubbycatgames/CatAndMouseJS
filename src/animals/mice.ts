import * as _ from 'lodash';

import Media         from '../constants/media';
import Random        from '../tools/random';


export default class Mice {

  group: Phaser.Group;

  constructor(game: Phaser.Game,
              private speed: number = 50,
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

      mouse.rotation = Phaser.Math.degToRad(game.rnd.integerInRange(0, 360));
      mouse.body.velocity = game.physics.arcade.velocityFromRotation(
                                              mouse.rotation, this.speed, null);

      mouse.body.collideWorldBounds = true;
      mouse.body.onWorldBounds = new Phaser.Signal();
      mouse.body.onWorldBounds.add(this.fleeWall, this);
    }
  }

  private fleeWall(mouse: Phaser.Sprite, up: boolean, down: boolean,
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
    mouse.rotation = Phaser.Math.degToRad(
      mouse.game.rnd.integerInRange(range[0], range[1])
    );
    mouse.body.velocity = mouse.game.physics.arcade.velocityFromRotation(
                                             mouse.rotation, this.speed, null);
  }
}
