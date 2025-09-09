import type Enemy from '../entities/enemy';
import type GameEngine from '../../core/game-engine';

import Projectile from '../entities/projectile';

const DEFAULT_ATTACK_SPEED = 600; // -> milliseconds
const DEFAULT_PROJECTILE_SPEED = 1000; // -> milliseconds
const DEFAULT_PROJECTILE_DURATION = 2000; // -> milliseconds

class Weapon {
  private attackTimer: number;
  private sprite: HTMLImageElement | null;

  public name: string;
  public damage: number;
  public projectileSpeed: number;
  public projectileDuration: number;
  public attackSpeed: number;
  public kills: number;

  constructor(
    name: string,
    damage: number,
    asset: string,
    attackOffset: number = 0,
    projectileSpeed: number = DEFAULT_PROJECTILE_SPEED,
    projectileDuration: number = DEFAULT_PROJECTILE_DURATION
  ) {
    this.name = name;
    this.damage = damage;
    this.projectileSpeed = projectileSpeed;
    this.projectileDuration = projectileDuration;
    this.kills = 0;

    this.attackSpeed = DEFAULT_ATTACK_SPEED;
    this.attackTimer = -attackOffset;

    this.sprite = null;
    this.loadImage(asset);
  }

  private loadImage(asset: string) {
    this.sprite = new Image();
    this.sprite.src = asset;
  }

  public canAttack(tick: number): boolean {
    this.attackTimer += tick;
    if (this.attackTimer >= this.attackSpeed) {
      this.attackTimer -= this.attackSpeed;
      return true;
    }
    return false;
  }

  public fireWeapon(ctx: GameEngine, nearestEnemy: Enemy) {
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
