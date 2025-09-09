import type GameEngine from '@/game/core/game-engine';
import type Enemy from '@/game/models/entities/enemy';
import type Projectile from '@/game/models/entities/projectile';

const killEnemy = (enemy: Enemy, projectile: Projectile, ctx: GameEngine) => {
  if (!projectile.sourceWeapon) {
    return;
  }

  if (projectile.hitEnemies.has(enemy)) {
    return;
  }

  projectile.hitEnemies.add(enemy);

  enemy.takeDamage(projectile.damage);
  projectile.pierceCount--;

  if (projectile.pierceCount <= 0) {
    projectile.shouldRemove = true;
  }

  if (enemy.health <= 0) {
    projectile.sourceWeapon.kills++;
    enemy.onDeathUpdate(ctx);
    ctx.events.emitEvent('killUpdate');
  }
  return;
};

export default killEnemy;
