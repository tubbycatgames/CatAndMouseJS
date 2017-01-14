import Media  from '../constants/media';
import Random from '../tools/random';


export default class Mice {

  private mice: Phaser.Group;
  private physics: Phaser.Physics.Arcade;

  private types: string[] = [
    Media.MICE.BLACK, Media.MICE.BROWN, Media.MICE.GREY, Media.MICE.WHITE
  ];

  constructor(private game: Phaser.Game, speed: number, count: number,
              private awareness: number) {
    this.physics = this.game.physics.arcade;

    this.mice = this.game.add.group();
    this.mice.enableBody = true;

    const image = this.game.cache.getImage(Media.MICE.BROWN);
    for (let _ of Phaser.ArrayUtils.numberArray(1, count)) {
      this.createMouse(image, speed);
    }
  }

  public getMiceGroup(): Phaser.Group {
    return this.mice;
  }

  public move(cat: Phaser.Sprite) {
    this.mice.forEachAlive((mouse: Phaser.Sprite) => {
      this.fleeMice(mouse);
      this.fleeCat(mouse, cat);
    }, this);
  }

  public kill(mouse: Phaser.Sprite): number {
    mouse.kill();
    return this.mice.countLiving();
  }

  private createMouse(image: HTMLImageElement, speed: number) {
    const type = this.types[this.game.rnd.between(0, this.types.length-1)];
    const mouse = this.mice.create(Random.x(this.game, image),
                                   Random.y(this.game, image),
                                   type);
    mouse.anchor.setTo(.5, .5);

    mouse.body.collideWorldBounds = true;
    mouse.body.onWorldBounds = new Phaser.Signal();
    mouse.body.onWorldBounds.add(this.fleeWall, this);

    mouse.events.onKilled.add(this.afterKill, this);

    mouse.body.speed = speed;
    this.adjustMouse(mouse, Math.random() * Phaser.Math.PI2);
  }

  private fleeWall(mouse: Phaser.Sprite, up: boolean, down: boolean,
                                         left: boolean, right: boolean) {
    let range: number[];
    if (up)         range = [15, 165];
    else if (down)  range = [-165, -15];
    else if (left)  range = [-75, 75];
    else if (right) range = [105, 255];
    else            range = [0, 0];

    this.adjustMouse(mouse, Phaser.Math.degToRad(
      this.game.rnd.between(range[0], range[1])
    ));
  }

  private afterKill(mouse: Phaser.Sprite) {
    mouse.visible = true;
    mouse.loadTexture(Media.MICE.DEAD);
  }

  private fleeMice(mouse: Phaser.Sprite) {
    this.mice.forEachAlive((otherMouse: Phaser.Sprite) => {
      if (mouse !== otherMouse) {
        if (this.physics.distanceBetween(mouse, otherMouse) < this.awareness) {
          this.adjustMouse(mouse,
            this.physics.angleBetween(mouse, otherMouse) + Math.PI);
        }
      }
    }, this);
  }

  private fleeCat(mouse: Phaser.Sprite, cat: Phaser.Sprite) {
    if (this.physics.distanceBetween(mouse, cat) < this.awareness) {
      this.adjustMouse(mouse, this.physics.angleBetween(mouse, cat) + Math.PI);
    }
  }

  private adjustMouse(mouse: Phaser.Sprite, rotation: number) {
    mouse.rotation = rotation;
    this.physics.velocityFromRotation(rotation, mouse.body.speed,
                                                mouse.body.velocity);
  }
}
