import type Enemy from "@/game/models/entities/enemy";

function getEnemiesInView(
  enemies: Enemy[],
  cameraX: number,
  cameraY: number,
  canvasWidth: number,
  canvasHeight: number
) {
  return enemies.filter(
    (enemy) =>
      enemy.x + enemy.width > cameraX &&
      enemy.x < cameraX + canvasWidth &&
      enemy.y + enemy.height > cameraY &&
      enemy.y < cameraY + canvasHeight
  );
}

export default getEnemiesInView;
