import type GameEngine from '@/game/core/game-engine';

const initEntityCleaner = (ctx: GameEngine) => {
  const { projectiles, enemies, experiencePoints } = ctx.state;

  const filteredEnemies = enemies.filter((enemy) => !enemy.shouldRemove);
  const filteredProjectiles = projectiles.filter((proj) => !proj.shouldRemove);
  const filteredExperiencePoints = experiencePoints.filter(
    (exp) => !exp.shouldRemove
  );

  ctx.state.enemies = filteredEnemies;
  ctx.state.experiencePoints = filteredExperiencePoints;
  ctx.state.projectiles = filteredProjectiles;
};

export default initEntityCleaner;
