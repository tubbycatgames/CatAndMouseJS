import * as _ from 'lodash';


interface SpriteVelocity {
  sprite: Phaser.Sprite;
  velocity: Phaser.Point;
}


export default class VelocityCache {
  
  private _velocities: SpriteVelocity[] = [];

  get(sprite: Phaser.Sprite): SpriteVelocity {
    return _.find(this._velocities, {sprite})
  }

  set(sprite: Phaser.Sprite) {
    const storedVelocity: SpriteVelocity = _.find(this._velocities, {sprite});
    if (storedVelocity) {
      storedVelocity.velocity = sprite.body.velocity.clone();
    }
    else {
      this._velocities.push({sprite, velocity: sprite.body.velocity.clone()});
    }
  }
}
