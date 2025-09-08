import type { PowerUp } from '@/types/power-ups';

const NUMBER_OF_POWER_UPS_TO_SELECT = 3;

class PowerUpManager {
  public powerUpCards: Array<PowerUp>;

  constructor() {
    this.powerUpCards = [];
  }

  public selectPowerUpCards() {
    const POWER_UPS: Array<PowerUp> = [
      {
        name: 'Strength',
        description: 'Increases your damage by 10%',
        iconKey: 'powerup_0',
      },
      {
        name: 'Speed',
        description: 'Increases your speed by 10%',
        iconKey: 'powerup_1',
      },
      {
        name: 'Health',
        description: 'Increases your health by 10%',
        iconKey: 'powerup_2',
      },
    ];

    this.powerUpCards = [];

    for (let i = 0; i < NUMBER_OF_POWER_UPS_TO_SELECT; i++) {
      const randomIndex = Math.floor(Math.random() * POWER_UPS.length);
      const chosenPowerUp = POWER_UPS.splice(randomIndex, 1)[0];

      this.powerUpCards.push(chosenPowerUp);
    }

    return this.powerUpCards;
  }
}

export default PowerUpManager;
