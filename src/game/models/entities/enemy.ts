import GameEntityObject from "./game-entity-object";

class Enemy extends GameEntityObject {
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

export default Enemy;
