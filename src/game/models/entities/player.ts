import type Enemy from "./enemy";

import GameEntityObject from "./game-entity-object";
import Weapon from "../items/weapon";

const DEFAULT_PLAYER_HEALTH = 15;
const DEFAULT_PLAYER_SPEED = 400; // -> pixels * ((tick) / 1000)
const PLAYER_INVULNERABILITY_TIME = 500; // -> milliseconds

export default class Player extends GameEntityObject {
  weapons: Array<Weapon>;
  damageCooldown: number;
  hitboxPadding: number;

  constructor(x: number, y: number, color: string) {
    super(x, y, color);

    this.health = DEFAULT_PLAYER_HEALTH;
    this.movementSpeed = DEFAULT_PLAYER_SPEED;
    this.weapons = [new Weapon("AK-47", 5)];

    this.hitboxPadding = 3;
    this.damageCooldown = 0;
  }

  takeDamage(damageTaken: number): void {
    this.health -= damageTaken;
    this.damageCooldown = PLAYER_INVULNERABILITY_TIME;
  }

  updateDamageCooldown(tick: number) {
    if (this.damageCooldown > 0) {
      this.damageCooldown -= tick;
    }
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

  findNearestEnemy(enemies: Enemy[]): Enemy | null {
    if (enemies.length === 0) {
      return null;
    }

    let nearestEnemy = enemies[0];
    let minDistance = Infinity;

    enemies.forEach((enemy) => {
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < minDistance) {
        minDistance = distance;
        nearestEnemy = enemy;
      }
    });

    return nearestEnemy;
  }
}
