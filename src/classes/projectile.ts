import GameEntityObject from "./game-entity-object";
import type GlobalGameState from "./game-state";

interface IProjectile {
  damage: number;
  duration: number;
  speed: number;
  velocityX: number;
  velocityY: number;
  shouldRemove: boolean;

  moveProjectile: (ctx: GlobalGameState) => void;
  checkEnemyCollision: (enemy: GameEntityObject) => void;
  updateAndCheckExpiration: (tick: number) => void;
}

const DEFAULT_DURATION = 2000;
const DEFAULT_PROJECTILE_SPEED = 1000;

export default class Projectile extends GameEntityObject implements IProjectile {
  duration: number;
  damage: number;
  speed: number;
  velocityX: number;
  velocityY: number;
  shouldRemove: boolean;

  constructor(
    x: number,
    y: number,
    color: string,
    damage: number,
    duration: number = DEFAULT_DURATION
  ) {
    super(x, y, color);

    this.duration = duration;
    this.damage = damage;
    this.speed = DEFAULT_PROJECTILE_SPEED;

    this.shouldRemove = false;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  moveProjectile(ctx: GlobalGameState): void {
    this.x += this.velocityX * (ctx.LOGIC_TICK / this.speed);
    this.y += this.velocityY * (ctx.LOGIC_TICK / this.speed);
  }

  checkEnemyCollision(enemy: GameEntityObject) {
    const leftSize = this.x < enemy.x + enemy.width;
    const rightSize = this.x + this.width > enemy.x;
    const topSize = this.y < enemy.y + enemy.height;
    const bottomSize = this.y + this.height > enemy.y;

    const isTouchingX = leftSize && rightSize;
    const isTouchingY = topSize && bottomSize;
    return isTouchingX && isTouchingY;
  }

  updateAndCheckExpiration(tick: number): void {
    this.duration -= tick;
    if (this.duration <= 0) {
      this.shouldRemove = true;
    }
  }
}
