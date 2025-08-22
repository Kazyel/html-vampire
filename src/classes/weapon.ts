import type GlobalGameState from "./game-state";
import type Enemy from "./enemy";

import Projectile from "./projectile";

interface IWeapon {
  name: string;
  damage: number;
  attackTimer: number;
  attackSpeed: number;
}

const DEFAULT_ATTACK_SPEED = 1000; // -> milliseconds

export default class Weapon implements IWeapon {
  name: string;
  damage: number;
  attackSpeed: number;
  attackTimer: number;

  constructor(name: string, damage: number) {
    this.name = name;
    this.damage = damage;

    this.attackSpeed = DEFAULT_ATTACK_SPEED;
    this.attackTimer = 0;
  }

  canAttack(tick: number): boolean {
    this.attackTimer += tick;
    if (this.attackTimer >= this.attackSpeed) {
      this.attackTimer -= this.attackSpeed;
      return true;
    }
    return false;
  }

  createProjectile(ctx: GlobalGameState, nearestEnemy: Enemy) {
    if (nearestEnemy) {
      const dx = nearestEnemy.x - ctx.player.x;
      const dy = nearestEnemy.y - ctx.player.y;

      const length = Math.sqrt(dx * dx + dy * dy);
      const directionX = dx / length;
      const directionY = dy / length;

      const newProjectile = new Projectile(
        ctx.player.x,
        ctx.player.y,
        "pink",
        this.damage
      );

      newProjectile.velocityX = directionX * 300;
      newProjectile.velocityY = directionY * 300;

      ctx.projectiles.push(newProjectile);
    }
  }
}
