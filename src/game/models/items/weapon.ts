import type Enemy from "../entities/enemy";
import type GameManager from "../../core/game-manager";

import Projectile from "../entities/projectile";

const DEFAULT_ATTACK_SPEED = 1000; // -> milliseconds

class Weapon {
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

  fireWeapon(ctx: GameManager, nearestEnemy: Enemy) {
    const { player, projectiles } = ctx.state;

    if (nearestEnemy) {
      const dx = nearestEnemy.x - player.x;
      const dy = nearestEnemy.y - player.y;

      const length = Math.hypot(dx, dy);
      if (length < 1e-8) return;

      const directionX = dx / length;
      const directionY = dy / length;

      const newProjectile = new Projectile(player.x, player.y, "pink", this.damage);

      newProjectile.velocityX = directionX * 300;
      newProjectile.velocityY = directionY * 300;

      projectiles.push(newProjectile);
    }
  }
}

export default Weapon;
