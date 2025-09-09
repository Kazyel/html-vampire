import type GameEngine from '../core/game-engine';
import type ExperiencePoint from '../models/entities/experience-point';

const collectExperience = (
  ctx: GameEngine,
  experiencePoint: ExperiencePoint
) => {
  const { player } = ctx.state;

  experiencePoint.shouldRemove = true;

  player.currentExp += experiencePoint.value;
  player.totalExp += experiencePoint.value;
  player.canLevelUp(ctx);

  ctx.events.emitEvent('experienceUpdate');
};

export default collectExperience;
