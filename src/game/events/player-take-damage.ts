import type GameEngine from '@/game/core/game-engine';
import type Enemy from '@/game/models/entities/enemy';
import type Player from '@/game/models/entities/player';

const playerTakesDamage = (player: Player, enemy: Enemy, ctx: GameEngine) => {
  player.takeDamage(enemy.damage);
  ctx.events.emitEvent('healthUpdate');
};

export default playerTakesDamage;
