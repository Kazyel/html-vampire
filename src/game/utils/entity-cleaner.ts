import type GameEngine from '@/game/core/game-engine';

const initEntityCleaner = (ctx: GameEngine) => {
  const { projectiles, enemies, experiencePoints, chests } = ctx.state;

  const filteredEnemies = enemies.filter((enemy) => !enemy.shouldRemove);
  const filteredProjectiles = projectiles.filter((proj) => !proj.shouldRemove);
  const filteredChests = chests.filter((chest) => !chest.shouldRemove);
  const filteredExperiencePoints = experiencePoints.filter(
    (exp) => !exp.shouldRemove
  );

  ctx.state.enemies = filteredEnemies;
  ctx.state.experiencePoints = filteredExperiencePoints;
  ctx.state.projectiles = filteredProjectiles;
  ctx.state.chests = filteredChests;
};

export default initEntityCleaner;
