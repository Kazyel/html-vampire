import type GameManager from "@/game/core/game-manager";

import getEnemiesInView from "@/game/utils/rendering/enemies-in-view";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@/constants/dimensions";

class AttackManager {
  orchestrateAttack(ctx: GameManager) {
    const { enemies, player, camera } = ctx.state;

    const visibleEnemies = getEnemiesInView(
      enemies,
      camera.x,
      camera.y,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );

    for (const weapon of player.weapons) {
      if (weapon.canAttack(ctx.LOGIC_TICK)) {
        const nearestEnemy = player.findNearestEnemy(visibleEnemies);

        if (nearestEnemy) {
          weapon.fireWeapon(ctx, nearestEnemy);
        }
      }
    }
  }

  updateProjectiles(ctx: GameManager) {
    const { projectiles, collisions } = ctx.state;

    for (const projectile of projectiles) {
      projectile.updateAndCheckExpiration(ctx.LOGIC_TICK);
      projectile.moveProjectile(ctx.LOGIC_TICK);
      collisions.checkProjectileHit(ctx, projectile);
    }
  }
}

export default AttackManager;
