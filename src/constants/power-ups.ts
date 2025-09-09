import type Player from '@/game/models/entities/player';
import type { PowerUp } from '@/types/power-ups';

export const POWER_UPS: Array<PowerUp> = [
  {
    name: 'Strength',
    description: 'Increases your damage by 10%',
    iconKey: 'powerup_0',
    applyEffect: (player: Player) => {
      for (const weapon of player.inventory.weapons) {
        weapon.damage += weapon.damage * 0.1;
      }
    },
  },
  {
    name: 'Speed',
    description: 'Increases your speed by 10%',
    iconKey: 'powerup_1',
    applyEffect: (player: Player) => {
      player.movementSpeed += player.movementSpeed * 0.1;
    },
  },
  {
    name: 'Health',
    description: 'Increases your health by 10%',
    iconKey: 'powerup_2',
    applyEffect: (player: Player) => {
      player.health += player.health * 0.1;
    },
  },
];
