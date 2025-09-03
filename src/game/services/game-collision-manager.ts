import type GameManager from "../core/game-manager";
import type Enemy from "../models/entities/enemy";
import ExperiencePoint from "../models/entities/experience-point";

import { buildSpatialGrid, getCellId } from "../utils/spatial-hashing";

export type PossibleEntities = Enemy | ExperiencePoint;
export type SpatialGrid<T extends PossibleEntities> = Map<string, Array<T>>;

class GameCollisionManager {
  private getPotentialColliders<T extends PossibleEntities>(
    x: number,
    y: number,
    spatialGrid: SpatialGrid<T>
  ): Array<T> {
    const cellId = getCellId(x, y);

    const [cellX, cellY] = cellId.split("-").map(Number);
    const potentialColliders: Array<T> = [];

    for (let y = cellY - 1; y <= cellY + 1; y++) {
      for (let x = cellX - 1; x <= cellX + 1; x++) {
        const neighborId = `${x}-${y}`;

        if (spatialGrid.has(neighborId)) {
          potentialColliders.push(...spatialGrid.get(neighborId)!);
        }
      }
    }

    return potentialColliders;
  }

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

  public checkPlayerGetsExperience(ctx: GameManager): void {
    const { player, experiencePoints } = ctx.state;

    const spatialGrid = buildSpatialGrid(experiencePoints);
    const potentialExperiencePoints = this.getPotentialColliders<ExperiencePoint>(
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

      const potentialEnemies = this.getPotentialColliders<Enemy>(
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
          enemy.onDeath(ctx);

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
      const potentialColliders = this.getPotentialColliders(
        enemy.x,
        enemy.y,
        spatialGrid
      );

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
