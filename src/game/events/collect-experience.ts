import type GameManager from '../core/game-manager';
import type ExperiencePoint from '../models/entities/experience-point';

const collectExperience = (
  ctx: GameManager,
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
