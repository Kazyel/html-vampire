import type Enemy from "../entities/enemy";
import type GameManager from "../../core/game-manager";

import Projectile from "../entities/projectile";

const DEFAULT_ATTACK_SPEED = 600; // -> milliseconds

class Weapon {
  private attackTimer: number;
  private sprite: HTMLImageElement | null;

  public name: string;
  public damage: number;
  public attackSpeed: number;
  public kills: number;

  private loadImage(asset: string) {
    this.sprite = new Image();
    this.sprite.src = asset;
  }

  constructor(name: string, damage: number, asset: string, attackOffset: number) {
    this.name = name;
    this.damage = damage;
    this.kills = 0;

    this.attackSpeed = DEFAULT_ATTACK_SPEED;
    this.attackTimer = -attackOffset;

    this.sprite = null;
    this.loadImage(asset);
  }

  public canAttack(tick: number): boolean {
    this.attackTimer += tick;
    if (this.attackTimer >= this.attackSpeed) {
      this.attackTimer -= this.attackSpeed;
      return true;
    }
    return false;
  }

  public fireWeapon(ctx: GameManager, nearestEnemy: Enemy) {
    const { player, projectiles } = ctx.state;

    if (nearestEnemy) {
      const dx = nearestEnemy.x - player.x;
      const dy = nearestEnemy.y - player.y;

      const projectileWidth = this.getSprite()?.width || 0;
      const projectileHeight = this.getSprite()?.height || 0;

      const length = Math.hypot(dx, dy);
      if (length < 1e-8) return;

      const directionX = dx / length;
      const directionY = dy / length;

      const newProjectile = new Projectile(
        player.x,
        player.y,
        projectileWidth,
        projectileHeight,
        this.damage,
        this
      );

      newProjectile.velocityX = directionX * 300;
      newProjectile.velocityY = directionY * 300;

      projectiles.push(newProjectile);
    }
  }

  public getSprite(): HTMLImageElement | null {
    if (this.sprite && this.sprite.complete) {
      return this.sprite;
    }
    return null;
  }
}

export default Weapon;
