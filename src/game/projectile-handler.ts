import type GlobalGameState from "@/classes/game-state";
import { checkProjectileHit } from "./collision-checks";

const handleProjectiles = (ctx: GlobalGameState) => {
  for (const weapon of ctx.player.weapons) {
    if (weapon.canAttack(ctx.LOGIC_TICK)) {
      weapon.createProjectile(ctx);
    }
  }

  for (const proj of ctx.projectiles) {
    proj.updateAndCheckExpiration(ctx.LOGIC_TICK);
    proj.moveProjectile(ctx);
    checkProjectileHit(ctx, proj);
  }
};

export default handleProjectiles;
