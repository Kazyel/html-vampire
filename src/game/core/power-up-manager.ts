import type { PowerUp } from '@/types/power-ups';

import { POWER_UPS } from '@/constants/power-ups';

const NUMBER_OF_POWER_UPS_TO_SELECT = 3;

class PowerUpManager {
  public currentPowerCards: Array<PowerUp>;

  constructor() {
    this.currentPowerCards = [];
  }

  public selectPowerUpCards() {
    const avalaiblePowerUps = [...POWER_UPS];
    this.currentPowerCards = [];

    for (let i = 0; i < NUMBER_OF_POWER_UPS_TO_SELECT; i++) {
      const randomIndex = Math.floor(Math.random() * avalaiblePowerUps.length);
      const chosenPowerUp = avalaiblePowerUps.splice(randomIndex, 1)[0];

      this.currentPowerCards.push(chosenPowerUp);
    }

    return this.currentPowerCards;
  }
}

export default PowerUpManager;
