import type GameEngine from '../core/game-engine';
import type Enemy from '../models/entities/enemy';
import type ExperiencePoint from '../models/entities/experience-point';

import collectExperience from '../events/collect-experience';
import killEnemy from '../events/kill-enemy';
import playerTakesDamage from '../events/player-take-damage';

import {
  buildSpatialGrid,
  getPotentialColliders,
  getPotentialCollidersWithinRange,
} from '../utils/spatial-hashing';

/**
 * TODO:
 *  Add a generic function to check collision between two entities
 *  Transform this class into a service for specific collision checks
 *  Then create a another manager for handling all collision checks
 */

class GameCollisionService {
  public checkEnemyHittingPlayer(ctx: GameEngine): void {
    const { player, enemies } = ctx.state;

    const spatialGrid = buildSpatialGrid(enemies);
    const potentialEnemies = getPotentialColliders<Enemy>(player, spatialGrid);

    for (const enemy of potentialEnemies) {
      const hasCollided = player.checkEnemyCollision(enemy);

      if (hasCollided && player.damageCooldown <= 0) {
        playerTakesDamage(player, enemy, ctx);
      }
    }
  }

  public checkPlayerGetsExperience(ctx: GameEngine): void {
    const { player, experiencePoints } = ctx.state;

    const spatialGrid = buildSpatialGrid(experiencePoints);
    const potentialExperiencePoints =
      getPotentialCollidersWithinRange<ExperiencePoint>(player, spatialGrid);

    for (const experiencePoint of potentialExperiencePoints) {
      const hasCollided = experiencePoint.checkPlayerExpRange(player);

      if (hasCollided) {
        collectExperience(ctx, experiencePoint);
        return;
      }
    }
  }

  public checkProjectileAndEnemyCollisions(ctx: GameEngine): void {
    const { projectiles, enemies } = ctx.state;

    const spatialGrid = buildSpatialGrid(enemies);

    for (const projectile of projectiles) {
      if (projectile.shouldRemove) {
        continue;
      }

      const potentialEnemies = getPotentialColliders<Enemy>(
        projectile,
        spatialGrid
      );

      for (const enemy of potentialEnemies) {
        if (enemy.shouldRemove) {
          continue;
        }

        if (projectile.checkEnemyCollision(enemy)) {
          killEnemy(enemy, projectile, ctx);
        }
      }
    }
  }

  public checkEnemyCollisions(ctx: GameEngine): void {
    const COLLISION_PADDING = 2;

    const { enemies } = ctx.state;
    const spatialGrid = buildSpatialGrid(enemies);

    for (const enemy of enemies) {
      const potentialColliders = getPotentialColliders(enemy, spatialGrid);

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

export default GameCollisionService;
