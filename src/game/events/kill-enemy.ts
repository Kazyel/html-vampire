import type GameManager from '@/game/core/game-manager';
import type Enemy from '@/game/models/entities/enemy';
import type Projectile from '@/game/models/entities/projectile';

const killEnemy = (enemy: Enemy, projectile: Projectile, ctx: GameManager) => {
  enemy.takeDamage(projectile.damage);
  projectile.shouldRemove = true;

  if (projectile.sourceWeapon && enemy.health <= 0) {
    projectile.sourceWeapon.kills++;
    enemy.onDeathUpdate(ctx);
    ctx.events.emitEvent('killUpdate');
  }
  return;
};

export default killEnemy;
