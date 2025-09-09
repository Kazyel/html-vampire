import type GameEngine from '@/game/core/game-engine';

import getEnemiesInView from '@/game/utils/enemies-in-view';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/constants/dimensions';

export const orchestrateAttack = (ctx: GameEngine) => {
  const { enemies, player, camera } = ctx.state;

  const visibleEnemies = getEnemiesInView(
    enemies,
    camera.x,
    camera.y,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );

  for (const weapon of player.inventory.weapons) {
    if (weapon.canAttack(ctx.LOGIC_TICK)) {
      const nearestEnemy = player.findNearestEnemy(visibleEnemies);

      if (nearestEnemy) {
        weapon.fireWeapon(ctx, nearestEnemy);
      }
    }
  }
};

export const updateProjectiles = (ctx: GameEngine) => {
  const { projectiles } = ctx.state;

  for (const projectile of projectiles) {
    projectile.update(ctx);
  }
};
