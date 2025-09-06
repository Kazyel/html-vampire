import type GameManager from '@/game/core/game-manager';

import getEnemiesInView from '@/game/utils/enemies-in-view';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/constants/dimensions';

export const orchestrateAttack = (ctx: GameManager) => {
  const { enemies, player, camera } = ctx.state;

  const visibleEnemies = getEnemiesInView(
    enemies,
    camera.x,
    camera.y,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
  );

  for (const weapon of player.weapons) {
    if (weapon.canAttack(ctx.LOGIC_TICK)) {
      const nearestEnemy = player.findNearestEnemy(visibleEnemies);

      if (nearestEnemy) {
        weapon.fireWeapon(ctx, nearestEnemy);
      }
    }
  }
};

export const updateProjectiles = (ctx: GameManager) => {
  const { projectiles } = ctx.state;

  for (const projectile of projectiles) {
    projectile.update(ctx);
  }
};
