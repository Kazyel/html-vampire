import GameEntityObject from "./game-entity-object";

interface IEnemy {
  damage: number;
  shouldRemove: boolean;

  takeDamage: (damageTaken: number) => void;
}

export default class Enemy extends GameEntityObject implements IEnemy {
  damage: number;
  shouldRemove: boolean;

  constructor(x: number, y: number, color: string) {
    super(x, y, color);

    this.damage = 1;
    this.shouldRemove = false;
  }

  takeDamage(damageTaken: number): void {
    this.health -= damageTaken;
  }
}
