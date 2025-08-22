import type GlobalGameState from "@/classes/game-state";
import type Projectile from "@/classes/projectile";

export const checkEnemyHit = (ctx: GlobalGameState) => {
  for (const enemy of ctx.enemies) {
    const hasCollided = ctx.player.checkEnemyCollision(enemy);

    if (hasCollided && ctx.player.damageCooldown <= 0) {
      ctx.player.takeDamage(enemy.damage);
      ctx.emitEvent();
    }
  }

  ctx.player.updateDamageCooldown(ctx.LOGIC_TICK);
};

export const checkProjectileHit = (ctx: GlobalGameState, proj: Projectile) => {
  if (proj.shouldRemove) {
    return;
  }

  for (const enemy of ctx.enemies) {
    if (enemy.shouldRemove) {
      continue;
    }

    const hasCollided = proj.checkEnemyCollision(enemy);
    if (hasCollided) {
      proj.shouldRemove = true;
      enemy.shouldRemove = true;
      return;
    }
  }
};
