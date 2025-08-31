import type GameEnemyManager from "@/game/services/game-enemy-manager";

function getEnemiesInView(
  enemies: GameEnemyManager,
  cameraX: number,
  cameraY: number,
  canvasWidth: number,
  canvasHeight: number
) {
  return enemies.spawned.filter(
    (enemy) =>
      enemy.x + enemy.width > cameraX &&
      enemy.x < cameraX + canvasWidth &&
      enemy.y + enemy.height > cameraY &&
      enemy.y < cameraY + canvasHeight
  );
}

export default getEnemiesInView;
