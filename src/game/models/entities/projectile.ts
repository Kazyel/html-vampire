import type GameEngine from '@/game/core/game-engine';
import type Weapon from '../items/weapon';
import type Enemy from './enemy';

import GameEntityObject from './game-entity-object';

class Projectile extends GameEntityObject {
  public duration: number;
  public damage: number;
  public speed: number;
  public velocityX: number;
  public velocityY: number;
  public pierceCount: number;

  public sourceWeapon: Weapon;
  public hitEnemies: Set<Enemy>;
  public shouldRemove: boolean;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    sourceWeapon: Weapon
  ) {
    super(x, y);

    this.duration = sourceWeapon.projectileDuration;
    this.speed = sourceWeapon.projectileSpeed;
    this.damage = sourceWeapon.damage;
    this.pierceCount = sourceWeapon.pierceCount;

    this.width = width;
    this.height = height;
    this.velocityX = 0;
    this.velocityY = 0;

    this.sourceWeapon = sourceWeapon;
    this.hitEnemies = new Set();
    this.shouldRemove = false;
  }

  private moveProjectile(tick: number): void {
    this.x += this.velocityX * (tick / this.speed);
    this.y += this.velocityY * (tick / this.speed);
  }

  private didExpire(tick: number): void {
    this.duration -= tick;
    if (this.duration <= 0) {
      this.shouldRemove = true;
    }
  }

  public checkEnemyCollision(enemy: GameEntityObject) {
    const { x, y, width, height } = enemy;

    const leftSize = this.x < x + width;
    const rightSize = this.x + this.width > x;
    const topSize = this.y < y + height;
    const bottomSize = this.y + this.height > y;

    const isTouchingX = leftSize && rightSize;
    const isTouchingY = topSize && bottomSize;
    return isTouchingX && isTouchingY;
  }

  public draw(canvasCtx: CanvasRenderingContext2D): void {
    const sprite = this.sourceWeapon.getProjectileSprite();
    if (!sprite) return;

    const rotationAngle =
      Math.atan2(this.velocityY, this.velocityX) - 1.5 * Math.PI;

    canvasCtx.imageSmoothingEnabled = false;

    canvasCtx.save();
    canvasCtx.translate(this.x, this.y);
    canvasCtx.rotate(rotationAngle);
    canvasCtx.drawImage(sprite, -this.width / 2, -this.height / 2);
    canvasCtx.restore();

    canvasCtx.imageSmoothingEnabled = true;
  }

  public update(ctx: GameEngine): void {
    this.moveProjectile(ctx.LOGIC_TICK);
    this.didExpire(ctx.LOGIC_TICK);
  }
}

export default Projectile;
