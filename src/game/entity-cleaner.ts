import type GlobalGameState from "@/classes/game-state";

const entityCleaner = (ctx: GlobalGameState) => {
  ctx.projectiles = ctx.projectiles.filter((proj) => !proj.shouldRemove);
  ctx.enemies = ctx.enemies.filter((enemy) => !enemy.shouldRemove);
};

export default entityCleaner;
