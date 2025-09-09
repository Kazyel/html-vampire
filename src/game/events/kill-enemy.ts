import type GameEngine from '@/game/core/game-engine';
import type Enemy from '@/game/models/entities/enemy';
import type Projectile from '@/game/models/entities/projectile';

const killEnemy = (enemy: Enemy, projectile: Projectile, ctx: GameEngine) => {
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
