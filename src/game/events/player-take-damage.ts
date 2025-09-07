import type GameManager from '@/game/core/game-manager';
import type Enemy from '@/game/models/entities/enemy';
import type Player from '@/game/models/entities/player';

const playerTakesDamage = (player: Player, enemy: Enemy, ctx: GameManager) => {
  player.takeDamage(enemy.damage);
  ctx.events.emitEvent('healthUpdate');
};

export default playerTakesDamage;
