import type GameManager from "@/game/core/game-manager";

const initEntityCleaner = (ctx: GameManager) => {
  const { projectiles, enemies, experiencePoints } = ctx.state;

  const filteredEnemies = enemies.filter((enemy) => !enemy.shouldRemove);
  const filteredProjectiles = projectiles.filter((proj) => !proj.shouldRemove);
  const filteredExperiencePoints = experiencePoints.filter((exp) => !exp.shouldRemove);

  ctx.state.enemies = filteredEnemies;
  ctx.state.experiencePoints = filteredExperiencePoints;
  ctx.state.projectiles = filteredProjectiles;
};

export default initEntityCleaner;
