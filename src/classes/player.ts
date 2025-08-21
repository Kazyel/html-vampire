import GameEntityObject from "./game-entity-object";

interface IPlayer {
  damageCooldown: number;

  checkEnemyCollision: (enemy: GameEntityObject) => void;
}

const DEFAULT_PLAYER_HEALTH = 15;
const INVULNERABILITY_TIME = 500;

export default class Player extends GameEntityObject implements IPlayer {
  damageCooldown: number;

  constructor(x: number, y: number, color: string) {
    super(x, y, color);

    this.health = DEFAULT_PLAYER_HEALTH;
    this.damageCooldown = 0;
  }

  takeDamage(damageTaken: number): void {
    this.health -= damageTaken;
    this.damageCooldown = INVULNERABILITY_TIME;
  }

  checkEnemyCollision(enemy: GameEntityObject) {
    const isTouchingX = this.x < enemy.x + enemy.width && this.x + this.width > enemy.x;
    const isTouchingY = this.y < enemy.y + enemy.height && this.y + this.height > enemy.y;

    return isTouchingX && isTouchingY;
  }
}
