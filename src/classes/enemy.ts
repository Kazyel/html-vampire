import GameEntityObject from "./game-entity-object";

interface IEnemy {
  damage: number;

  takeDamage: (damageTaken: number) => void;
}

export default class Enemy extends GameEntityObject implements IEnemy {
  damage: number;

  constructor(x: number, y: number, color: string) {
    super(x, y, color);

    this.damage = 1;
  }

  takeDamage(damageTaken: number): void {
    this.health -= damageTaken;
  }
}
