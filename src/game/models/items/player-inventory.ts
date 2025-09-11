import type { PowerUp } from '@/types/drops';
import type Weapon from './weapon';

class PlayerInventory {
  public weapons: Array<Weapon>;
  public powerUps: Map<
    string,
    {
      count: number;
      powerUp: PowerUp;
    }
  >;

  constructor() {
    this.weapons = [];
    this.powerUps = new Map();
  }

  public addWeapon(weapon: Weapon): void {
    const offsetValue = 100;
    const newWeaponIndex = this.weapons.length;
    const attackTimerOffset = newWeaponIndex * offsetValue;

    weapon.attackTimer = -attackTimerOffset;

    this.weapons.push(weapon);
  }

  public addPowerUp(powerUp: PowerUp): void {
    if (this.powerUps.has(powerUp.name)) {
      this.powerUps.set(powerUp.name, {
        count: this.powerUps.get(powerUp.name)!.count + 1,
        powerUp,
      });
      return;
    }

    this.powerUps.set(powerUp.name, {
      count: 1,
      powerUp,
    });
  }
}

export default PlayerInventory;
