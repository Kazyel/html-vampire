import type GameManager from "@/game/core/game-manager";

const initEntityCleaner = (ctx: GameManager) => {
  const { projectiles, enemies } = ctx.state;

  ctx.state.projectiles = projectiles.filter((proj) => !proj.shouldRemove);
  ctx.state.enemies = enemies.filter((enemy) => !enemy.shouldRemove);
};

export default initEntityCleaner;
