import type Projectile from "../models/entities/projectile";
import type GameManager from "../core/game-manager";

class GameCollisionManager {
  checkEnemyHittingPlayer = (ctx: GameManager) => {
    const { player, enemies } = ctx.state;

    for (const enemy of enemies) {
      const hasCollided = player.checkEnemyCollision(enemy);

      if (hasCollided && player.damageCooldown <= 0) {
        player.takeDamage(enemy.damage);
        ctx.events.emitEvent();
      }
    }

    player.updateDamageCooldown(ctx.LOGIC_TICK);
  };

  checkProjectileHit = (ctx: GameManager, proj: Projectile) => {
    const { enemies } = ctx.state;

    if (proj.shouldRemove) {
      return;
    }

    for (const enemy of enemies) {
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
}

export default GameCollisionManager;
