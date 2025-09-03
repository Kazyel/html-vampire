import type Enemy from "./enemy";
import type GameManager from "@/game/core/game-manager";
import type { MovementKeys } from "@/types/events";

import GameEntityObject from "./game-entity-object";
import {
  orchestrateAttack,
  updateProjectiles,
} from "@/game/services/player/attack-manager";
import Weapon from "../items/weapon";
import checkMapBounds from "@/game/utils/check-map-bounds";

const DEFAULT_PLAYER_HEALTH = 15;
const DEFAULT_PLAYER_SPEED = 400; // -> pixels * ((tick) / 1000)
const PLAYER_INVULNERABILITY_TIME = 300; // -> milliseconds

export default class Player extends GameEntityObject {
  public weapons: Array<Weapon>;
  public damageCooldown: number;
  public hitboxPadding: number;

  private updateDamageCooldown(tick: number) {
    if (this.damageCooldown > 0) {
      this.damageCooldown -= tick;
    }
  }

  private walk(x: number, y: number, tick: number): void {
    this.x += x * (tick / 1000);
    this.y += y * (tick / 1000);
  }

  private handleAttack(ctx: GameManager) {
    orchestrateAttack(ctx);
    updateProjectiles(ctx);
  }

  private handleMovement(tick: number, keys: MovementKeys) {
    checkMapBounds(this);
    if (keys.ArrowDown) this.walk(0, this.movementSpeed, tick);
    if (keys.ArrowUp) this.walk(0, -this.movementSpeed, tick);
    if (keys.ArrowLeft) this.walk(-this.movementSpeed, 0, tick);
    if (keys.ArrowRight) this.walk(this.movementSpeed, 0, tick);
  }

  constructor(x: number, y: number, color: string) {
    super(x, y, color);

    this.health = DEFAULT_PLAYER_HEALTH;
    this.movementSpeed = DEFAULT_PLAYER_SPEED;
    this.weapons = [new Weapon("AK-47", 5, "/assets/weapons/bullet.png", 0)];

    this.hitboxPadding = 3;
    this.damageCooldown = 0;
  }

  public takeDamage(damageTaken: number): void {
    if (this.damageCooldown <= 0) {
      this.health -= damageTaken;
      this.damageCooldown = PLAYER_INVULNERABILITY_TIME;
    }
  }

  public checkEnemyCollision(enemy: GameEntityObject) {
    const leftSide = this.x + this.hitboxPadding < enemy.x + enemy.width;
    const rightSide = this.x + this.width - this.hitboxPadding > enemy.x;
    const topSide = this.y + this.hitboxPadding < enemy.y + enemy.height;
    const bottomSide = this.y + this.height - this.hitboxPadding > enemy.y;

    return leftSide && rightSide && topSide && bottomSide;
  }

  public findNearestEnemy(enemies: Enemy[]): Enemy | null {
    if (enemies.length === 0) return null;

    let nearestEnemy = enemies[0];
    let minDistance = Infinity;

    enemies.forEach((enemy) => {
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      const distance = dx * dx + dy * dy;

      if (distance < minDistance) {
        minDistance = distance;
        nearestEnemy = enemy;
      }
    });

    return nearestEnemy;
  }

  public update(ctx: GameManager, keys: MovementKeys) {
    this.updateDamageCooldown(ctx.LOGIC_TICK);
    this.handleMovement(ctx.LOGIC_TICK, keys);
    this.handleAttack(ctx);
  }
}
