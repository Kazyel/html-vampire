import type GameManager from "../core/game-manager";
import type Enemy from "../models/entities/enemy";
import type ExperiencePoint from "../models/entities/experience-point";

import { buildSpatialGrid, getPotentialColliders } from "../utils/spatial-hashing";

class GameCollisionManager {
  public checkEnemyHittingPlayer(ctx: GameManager): void {
    const { player, enemies } = ctx.state;

    const spatialGrid = buildSpatialGrid(enemies);
    const potentialEnemies = getPotentialColliders<Enemy>(
      player.x,
      player.y,
      spatialGrid
    );

    for (const enemy of potentialEnemies) {
      const hasCollided = player.checkEnemyCollision(enemy);
      if (hasCollided && player.damageCooldown <= 0) {
        player.takeDamage(enemy.damage);
        ctx.events.emitEvent("healthUpdate");
      }
    }
  }

  public checkPlayerGetsExperience(ctx: GameManager): void {
    const { player, experiencePoints } = ctx.state;

    const spatialGrid = buildSpatialGrid(experiencePoints);
    const potentialExperiencePoints = getPotentialColliders<ExperiencePoint>(
      player.x,
      player.y,
      spatialGrid
    );

    for (const experiencePoint of potentialExperiencePoints) {
      if (experiencePoint.checkPlayerCollision(player)) {
        experiencePoint.shouldRemove = true;
        player.experiencePoints += 1;
        ctx.events.emitEvent("experienceUpdate");
        return;
      }
    }
  }

  public checkProjectileAndEnemyCollisions(ctx: GameManager): void {
    const { projectiles, enemies } = ctx.state;

    const spatialGrid = buildSpatialGrid(enemies);

    for (const projectile of projectiles) {
      if (projectile.shouldRemove) {
        continue;
      }

      const potentialEnemies = getPotentialColliders<Enemy>(
        projectile.x,
        projectile.y,
        spatialGrid
      );

      for (const enemy of potentialEnemies) {
        if (enemy.shouldRemove) {
          continue;
        }

        if (projectile.checkEnemyCollision(enemy)) {
          projectile.shouldRemove = true;
          enemy.onDeathUpdate(ctx);

          if (projectile.sourceWeapon) {
            projectile.sourceWeapon.kills++;
            ctx.events.emitEvent("killUpdate");
          }
          return;
        }
      }
    }
  }

  public checkEnemyCollisions(ctx: GameManager): void {
    const COLLISION_PADDING = 2;

    const { enemies } = ctx.state;
    const spatialGrid = buildSpatialGrid(enemies);

    for (const enemy of enemies) {
      const potentialColliders = getPotentialColliders(enemy.x, enemy.y, spatialGrid);

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
