import type GameEngine from '../core/game-engine';
import type Chest from '../models/entities/drops/chest';

const collectChest = (ctx: GameEngine, chest: Chest) => {
  chest.shouldRemove = true;
  ctx.events.emitEvent('weaponDrop');
};

export default collectChest;
