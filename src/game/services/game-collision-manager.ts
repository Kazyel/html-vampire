import type Projectile from "../models/entities/projectile";
import type GameManager from "../core/game-manager";
import type Enemy from "../models/entities/enemy";

import { buildSpatialGrid, getCellId } from "../utils/spatial-hashing";

class GameCollisionManager {
  public checkEnemyHittingPlayer(ctx: GameManager): void {
    const { player, enemies } = ctx.state;

    for (const enemy of enemies) {
      const hasCollided = player.checkEnemyCollision(enemy);

      if (hasCollided && player.damageCooldown <= 0) {
        player.takeDamage(enemy.damage);
        ctx.events.emitEvent("healthUpdate");
      }
    }
  }

  public checkProjectileHittingEnemy(ctx: GameManager, projectile: Projectile): void {
    if (projectile.shouldRemove) {
      return;
    }

    const { enemies } = ctx.state;

    for (const enemy of enemies) {
      if (enemy.shouldRemove) {
        continue;
      }

      const hasCollided = projectile.checkEnemyCollision(enemy);

      if (hasCollided) {
        projectile.shouldRemove = true;
        enemy.shouldRemove = true;

        if (projectile.sourceWeapon) {
          projectile.sourceWeapon.kills++;
          ctx.events.emitEvent("killUpdate");
        }

        return;
      }
    }
  }

  public checkEnemyCollisions(ctx: GameManager): void {
    const COLLISION_PADDING = 2;

    const { enemies } = ctx.state;
    const spatialGrid = buildSpatialGrid(enemies);

    for (const enemy of enemies) {
      const cellId = getCellId(enemy.x, enemy.y);

      const [cellX, cellY] = cellId.split("-").map(Number);
      const potentialColliders: Array<Enemy> = [];

      for (let y = cellY - 1; y <= cellY + 1; y++) {
        for (let x = cellX - 1; x <= cellX + 1; x++) {
          const neighborId = `${x}-${y}`;

          if (spatialGrid.has(neighborId)) {
            potentialColliders.push(...spatialGrid.get(neighborId)!);
          }
        }
      }

      for (const otherEnemy of potentialColliders) {
        if (enemy !== otherEnemy) {
          const dx = otherEnemy.x - enemy.x;
          const dy = otherEnemy.y - enemy.y;
          const distance = Math.hypot(dx, dy);

          const combinedHalfWidths = enemy.width / 2 + otherEnemy.width / 2;
          const separationDistance = combinedHalfWidths + COLLISION_PADDING;

          if (distance < separationDistance) {
            const overlap = separationDistance - distance;
            const directionX = distance ? dx / distance : 0;
            const directionY = distance ? dy / distance : 0;

            const displacementX = (directionX * overlap) / 2;
            const displacementY = (directionY * overlap) / 2;

            enemy.x -= displacementX;
            enemy.y -= displacementY;
            otherEnemy.x += displacementX;
            otherEnemy.y += displacementY;
          }
        }
      }
    }
  }
}

export default GameCollisionManager;
