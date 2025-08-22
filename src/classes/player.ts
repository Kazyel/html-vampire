import GameEntityObject from "./game-entity-object";

interface IPlayer {
  damageCooldown: number;
  hitboxPadding: number;

  checkEnemyCollision: (enemy: GameEntityObject) => void;
}

const DEFAULT_PLAYER_HEALTH = 15;
const DEFAULT_PLAYER_SPEED = 400;
const PLAYER_INVULNERABILITY_TIME = 500;

export default class Player extends GameEntityObject implements IPlayer {
  damageCooldown: number;
  hitboxPadding: number;

  constructor(x: number, y: number, color: string) {
    super(x, y, color);

    this.health = DEFAULT_PLAYER_HEALTH;
    this.movementSpeed = DEFAULT_PLAYER_SPEED;
    this.hitboxPadding = 3;
    this.damageCooldown = 0;
  }

  takeDamage(damageTaken: number): void {
    this.health -= damageTaken;
    this.damageCooldown = PLAYER_INVULNERABILITY_TIME;
  }

  checkEnemyCollision(enemy: GameEntityObject) {
    const leftSize = this.x + this.hitboxPadding < enemy.x + enemy.width;
    const rightSize = this.x + this.width - this.hitboxPadding > enemy.x;
    const topSize = this.y + this.hitboxPadding < enemy.y + enemy.height;
    const bottomSize = this.y + this.height - this.hitboxPadding > enemy.y;

    const isTouchingX = leftSize && rightSize;
    const isTouchingY = topSize && bottomSize;
    return isTouchingX && isTouchingY;
  }
}
