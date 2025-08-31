import type GameManager from "@/game/core/game-manager";

const entityCleaner = (ctx: GameManager) => {
  ctx.state.projectiles = ctx.state.projectiles.filter((proj) => !proj.shouldRemove);

  ctx.state.enemies.spawned = ctx.state.enemies.spawned.filter(
    (enemy) => !enemy.shouldRemove
  );
};

export default entityCleaner;
