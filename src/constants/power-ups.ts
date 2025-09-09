import type GameEngine from '@/game/core/game-engine';
import type { PowerUp } from '@/types/power-ups';

export const POWER_UPS: Array<PowerUp> = [
  {
    name: 'Strength',
    description: 'Increases your damage by 10%',
    iconKey: 'powerup_0',
    applyEffect: (game: GameEngine) => {
      const { player } = game.state;

      for (const weapon of player.inventory.weapons) {
        weapon.damage += weapon.damage * 0.1;
      }
    },
  },
  {
    name: 'Speed',
    description: 'Increases your speed by 10%',
    iconKey: 'powerup_1',
    applyEffect: (game: GameEngine) => {
      const { player } = game.state;

      player.movementSpeed += player.movementSpeed * 0.1;
    },
  },
  {
    name: 'Health',
    description: 'Increases your health by 10%',
    iconKey: 'powerup_2',
    applyEffect: (game: GameEngine) => {
      const { events } = game;
      const { player } = game.state;

      player.health += player.health * 0.1;
      events.emitEvent('healthUpdate');
    },
  },
];
