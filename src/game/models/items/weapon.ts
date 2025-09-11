import type Enemy from '../entities/enemy';
import type GameEngine from '../../core/game-engine';

import Projectile from '../entities/projectile';

const DEFAULT_ATTACK_SPEED = 600;
const DEFAULT_PROJECTILE_SPEED = 1000;
const DEFAULT_PROJECTILE_DURATION = 2000;
const DEFAULT_PIERCE_COUNT = 1;

class Weapon {
  private sprite: HTMLImageElement | null;

  public name: string;
  public kills: number;
  public damage: number;
  public pierceCount: number;
  public projectileSpeed: number;
  public projectileDuration: number;
  public attackSpeed: number;
  public attackTimer: number;

  constructor(
    name: string,
    damage: number,
    projectileAsset: string,
    attackSpeed: number = DEFAULT_ATTACK_SPEED,
    pierceCount: number = DEFAULT_PIERCE_COUNT,
    projectileSpeed: number = DEFAULT_PROJECTILE_SPEED,
    projectileDuration: number = DEFAULT_PROJECTILE_DURATION
  ) {
    this.name = name;
    this.damage = damage;
    this.projectileSpeed = projectileSpeed;
    this.projectileDuration = projectileDuration;
    this.pierceCount = pierceCount;
    this.kills = 0;

    this.attackSpeed = attackSpeed;
    this.attackTimer = 0;

    this.sprite = null;
    this.loadImage(projectileAsset);
  }

  private loadImage(projectileAsset: string) {
    this.sprite = new Image();
    this.sprite.src = projectileAsset;
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

      const projectileWidth = this.getProjectileSprite()?.width || 0;
      const projectileHeight = this.getProjectileSprite()?.height || 0;

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

  public getProjectileSprite(): HTMLImageElement | null {
    if (this.sprite && this.sprite.complete) {
      return this.sprite;
    }
    return null;
  }
}

export default Weapon;
