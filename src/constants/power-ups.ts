import type GameEngine from '@/game/core/game-engine';
import type { PowerUp } from '@/types/drops';

export const POWER_UPS: Array<PowerUp> = [
  {
    name: 'Strength',
    description: 'Increases your damage by 10%',
    iconKey: 'powerup_0',
    applyEffect: (game: GameEngine) => {
      const { player } = game.state;

      for (const weapon of player.inventory.weapons) {
        weapon.damage += Math.floor(weapon.damage * 0.1);
      }
    },
  },
  {
    name: 'Speed',
    description: 'Increases your speed by 10%',
    iconKey: 'powerup_1',
    applyEffect: (game: GameEngine) => {
      const { player } = game.state;

      player.movementSpeed += Math.floor(player.movementSpeed * 0.1);
    },
  },
  {
    name: 'Health',
    description: 'Increases your health by 10%',
    iconKey: 'powerup_2',
    applyEffect: (game: GameEngine) => {
      const { events } = game;
      const { player } = game.state;

      player.health += Math.floor(player.health * 0.1);
      events.emitEvent('healthUpdate');
    },
  },
  {
    name: 'Experience Range',
    description: 'Increases your pickup range by 10%',
    iconKey: 'powerup_3',
    applyEffect: (game: GameEngine) => {
      const { player } = game.state;

      player.expPickupRange += Math.floor(player.expPickupRange * 0.1);
    },
  },
  {
    name: 'Projectile Pierce',
    description: 'Increases your enemy pierce by 1',
    iconKey: 'powerup_4',
    applyEffect: (game: GameEngine) => {
      const { player } = game.state;

      for (const weapon of player.inventory.weapons) {
        weapon.pierceCount += 1;
      }
    },
  },
  {
    name: 'Attack Speed',
    description: 'Increases your attack speed by 10%',
    iconKey: 'powerup_5',
    applyEffect: (game: GameEngine) => {
      const { player } = game.state;

      for (const weapon of player.inventory.weapons) {
        weapon.attackSpeed -= Math.floor(weapon.attackSpeed * 0.1);
      }
    },
  },
  {
    name: 'Projectile Speed',
    description: 'Increases your projectile speed by 10%',
    iconKey: 'powerup_6',
    applyEffect: (game: GameEngine) => {
      const { player } = game.state;

      for (const weapon of player.inventory.weapons) {
        weapon.projectileSpeed -= Math.floor(weapon.projectileSpeed * 0.1);
      }
    },
  },
  {
    name: 'Projectile Duration',
    description: 'Increases your projectile duration by 25%',
    iconKey: 'powerup_7',
    applyEffect: (game: GameEngine) => {
      const { player } = game.state;

      for (const weapon of player.inventory.weapons) {
        weapon.projectileDuration += Math.floor(
          weapon.projectileDuration * 0.25
        );
      }
    },
  },
];
