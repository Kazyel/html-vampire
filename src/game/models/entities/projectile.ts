import type GameManager from "@/game/core/game-manager";
import type Weapon from "../items/weapon";

import GameEntityObject from "./game-entity-object";

class Projectile extends GameEntityObject {
  public duration: number;
  public damage: number;
  public speed: number;
  public velocityX: number;
  public velocityY: number;
  public shouldRemove: boolean;
  public sourceWeapon: Weapon;

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

  constructor(x: number, y: number, width: number, height: number, sourceWeapon: Weapon) {
    super(x, y);

    this.sourceWeapon = sourceWeapon;
    this.duration = sourceWeapon.projectileDuration;
    this.speed = sourceWeapon.projectileSpeed;
    this.damage = sourceWeapon.damage;

    this.width = width;
    this.height = height;
    this.velocityX = 0;
    this.velocityY = 0;

    this.shouldRemove = false;
  }

  public checkEnemyCollision(enemy: GameEntityObject) {
    const leftSize = this.x < enemy.x + enemy.width;
    const rightSize = this.x + this.width > enemy.x;
    const topSize = this.y < enemy.y + enemy.height;
    const bottomSize = this.y + this.height > enemy.y;

    const isTouchingX = leftSize && rightSize;
    const isTouchingY = topSize && bottomSize;
    return isTouchingX && isTouchingY;
  }

  public draw(canvasCtx: CanvasRenderingContext2D): void {
    const sprite = this.sourceWeapon.getSprite();
    if (!sprite) return;

    const rotationAngle = Math.atan2(this.velocityY, this.velocityX) - 1.5 * Math.PI;

    canvasCtx.save();
    canvasCtx.translate(this.x, this.y);
    canvasCtx.rotate(rotationAngle);
    canvasCtx.drawImage(sprite, -this.width / 2, -this.height / 2);
    canvasCtx.restore();
  }

  public update(ctx: GameManager): void {
    this.moveProjectile(ctx.LOGIC_TICK);
    this.didExpire(ctx.LOGIC_TICK);
  }
}

export default Projectile;
