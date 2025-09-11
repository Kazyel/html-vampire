import type GameEngine from '@/game/core/game-engine';
import type Projectile from '@/game/models/entities/projectile';
import type SmallEnemy from '@/game/models/entities/enemies/small-enemy';

import RareEnemy from '@/game/models/entities/enemies/rare-enemy';

const killEnemy = (
  enemy: SmallEnemy | RareEnemy,
  projectile: Projectile,
  ctx: GameEngine
) => {
  if (!projectile.sourceWeapon || projectile.hitEnemies.has(enemy)) {
    return;
  }

  enemy.takeDamage(projectile.damage);
  projectile.hitEnemies.add(enemy);
  projectile.pierceCount--;

  if (projectile.pierceCount <= 0) {
    projectile.shouldRemove = true;
  }

  if (enemy.health <= 0) {
    projectile.sourceWeapon.kills++;
    enemy.onDeathUpdate(ctx);

    if (enemy instanceof RareEnemy) {
      enemy.dropRareItem(ctx);
    }

    ctx.events.emitEvent('killUpdate');
  }
};

export default killEnemy;
