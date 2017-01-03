import Animal from './animal';
import Media  from '../constants/media';
import Random from '../tools/random';


export default class Mice {

  group: Phaser.Group;

  private image: HTMLImageElement;

  constructor(private game: Phaser.Game,
              private speed: number = 50,
              mouseCount: number = 20) {
    this.group = this.game.add.group();
    this.group.enableBody = true;

    this.image = this.game.cache.getImage(Media.MOUSE);
    for (let i of Phaser.ArrayUtils.numberArray(0, mouseCount)) {
      this.createMouse();
    }
  }

  public move(cat: Phaser.Sprite) {
    this.group.forEachAlive((mouse: Phaser.Sprite) => {
      const mouseAwareness = this.game.add.sprite(mouse.left, mouse.top,
                                                  Media.MOUSE_AWARENESS);

      this.game.physics.arcade.enable(mouseAwareness);
      this.game.physics.arcade.overlap(mouseAwareness, this.group,
                                       this.fleeMouse(mouse), null, this);
      this.game.physics.arcade.overlap(mouseAwareness, cat,
                                       this.fleeCat(mouse), null, this);
      mouseAwareness.destroy();
    }, this);
  }

  private createMouse() {
    const mouse = this.group.create(Random.x(this.game, this.image),
                                    Random.y(this.game, this.image),
                                    Media.MOUSE);
    mouse.anchor.setTo(.5, .5);

    mouse.rotation = Phaser.Math.degToRad(this.game.rnd.between(0, 360));
    mouse.body.velocity = Animal.getVelocity(mouse, this.speed);

    mouse.body.collideWorldBounds = true;
    mouse.body.onWorldBounds = new Phaser.Signal();
    mouse.body.onWorldBounds.add(this.fleeWall, this);
  }

  private fleeCat(mouse: Phaser.Sprite) {
    return (awarenessZone: Phaser.Sprite, cat: Phaser.Sprite) => {
      const angle = this.game.physics.arcade.angleBetween(mouse, cat);
      mouse.rotation = angle + Math.PI;
      mouse.body.velocity = Animal.getVelocity(mouse, this.speed);
    };
  }

  private fleeMouse(mouse: Phaser.Sprite) {
    return (awarenessZone: Phaser.Sprite, otherMouse: Phaser.Sprite) => {
      if (otherMouse !== mouse) {
        if (Math.abs(mouse.rotation - otherMouse.rotation) < Math.PI) {
          mouse.rotation = mouse.rotation +
            ((Math.PI / 4) * this.game.rnd.between(0, 1));
          mouse.body.velocity = Animal.getVelocity(mouse, this.speed);
        }
      }
    };
  }

  private fleeWall(mouse: Phaser.Sprite, up: boolean, down: boolean,
                                         left: boolean, right: boolean) {
    let range: number[];
    if (up)         range = [15, 165];
    else if (down)  range = [-165, -15];
    else if (left)  range = [-75, 75];
    else if (right) range = [105, 255];
    else            range = [0, 0];

    mouse.rotation = Phaser.Math.degToRad(
      this.game.rnd.between(range[0], range[1])
    );
    mouse.body.velocity = Animal.getVelocity(mouse, this.speed);
  }
}
