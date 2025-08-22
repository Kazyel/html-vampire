import type GlobalGameState from "@/classes/game-state";

import getEnemiesInView from "./enemies-in-view";
import { checkProjectileHit } from "./collisions";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@/constants/dimensions";

const handleProjectiles = (ctx: GlobalGameState) => {
  const viewWidth = CANVAS_WIDTH;
  const viewHeight = CANVAS_HEIGHT;

  const visibleEnemies = getEnemiesInView(
    ctx.enemies,
    ctx.camera.x,
    ctx.camera.y,
    viewWidth,
    viewHeight
  );

  for (const weapon of ctx.player.weapons) {
    if (weapon.canAttack(ctx.LOGIC_TICK)) {
      const nearestEnemy = ctx.player.findNearestEnemy(visibleEnemies);

      if (nearestEnemy) {
        weapon.createProjectile(ctx, nearestEnemy);
      }
    }
  }

  for (const projectile of ctx.projectiles) {
    projectile.updateAndCheckExpiration(ctx.LOGIC_TICK);
    projectile.moveProjectile(ctx);
    checkProjectileHit(ctx, projectile);
  }
};

export default handleProjectiles;
