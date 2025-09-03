import type GameManager from "@/game/core/game-manager";

const initEntityCleaner = (ctx: GameManager) => {
  const { projectiles, enemies } = ctx.state;

  const filteredEnemies = enemies.filter((enemy) => !enemy.shouldRemove);
  const filteredProjectiles = projectiles.filter((proj) => !proj.shouldRemove);

  ctx.state.enemies = filteredEnemies;
  ctx.state.projectiles = filteredProjectiles;
};

export default initEntityCleaner;
