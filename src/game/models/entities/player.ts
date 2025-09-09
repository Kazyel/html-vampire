import type Enemy from './enemy';
import type GameEngine from '@/game/core/game-engine';
import type { MovementKeys } from '@/types/inputs';

import Weapon from '../items/weapon';
import GameEntityObject from './game-entity-object';
import checkMapBounds from '@/game/utils/check-map-bounds';
import Inventory from '../items/inventory';
import Circle from '../canvas/circle';

import {
  orchestrateAttack,
  updateProjectiles,
} from '@/game/utils/attack-manager';

const PLAYER_MAX_LEVEL = 100;
const DEFAULT_PLAYER_HEALTH = 15;
const DEFAULT_PLAYER_SPEED = 400;
const PLAYER_INVULNERABILITY_TIME = 300;
const PLAYER_BASE_XP = 50;

export default class Player extends GameEntityObject {
  public level: number;
  public currentHealth: number;
  public health: number;
  public movementSpeed: number;

  public totalExp: number;
  public currentExp: number;
  public expToLevelUp: number;
  public expPickupRange: number;
  public expRangeCircle: Circle;

  private hitboxPadding: number;
  public damageCooldown: number;
  public inventory: Inventory;

  constructor(x: number, y: number, color: string) {
    super(x, y, color);

    this.currentHealth = DEFAULT_PLAYER_HEALTH;
    this.health = DEFAULT_PLAYER_HEALTH;
    this.movementSpeed = DEFAULT_PLAYER_SPEED;
    this.inventory = new Inventory();

    this.inventory.addWeapon(
      new Weapon('AK-47', 30, '/assets/weapons/bullet.png', 0, 300, 4)
    );

    this.level = 1;

    this.expPickupRange = 150;
    this.expRangeCircle = new Circle(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.expPickupRange
    );

    this.totalExp = 0;
    this.currentExp = 0;
    this.expToLevelUp = PLAYER_BASE_XP;

    this.hitboxPadding = 3;
    this.damageCooldown = 0;
  }

  private updateDamageCooldown(tick: number) {
    if (this.damageCooldown > 0) {
      this.damageCooldown -= tick;
    }
  }

  private walk(x: number, y: number, tick: number): void {
    this.x += x * (tick / 1000);
    this.y += y * (tick / 1000);
  }

  private handleAttack(ctx: GameEngine) {
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

  private calculateExpToLevelUp() {
    const TRANSITION_LEVEL = 50;

    if (this.level <= TRANSITION_LEVEL) {
      const EARLY_RATE = 1.4;
      return Math.floor(PLAYER_BASE_XP * Math.pow(EARLY_RATE, this.level - 1));
    }

    const xpAtTransitionLevel = 50 * Math.pow(1.4, TRANSITION_LEVEL - 1);
    const LATE_RATE = 2;

    return Math.floor(
      xpAtTransitionLevel * Math.pow(LATE_RATE, this.level - TRANSITION_LEVEL)
    );
  }

  public takeDamage(damageTaken: number): void {
    if (this.damageCooldown <= 0) {
      this.currentHealth -= damageTaken;
      this.damageCooldown = PLAYER_INVULNERABILITY_TIME;
    }
  }

  public canLevelUp(ctx: GameEngine): void {
    if (this.level >= PLAYER_MAX_LEVEL) return;
    if (this.currentExp < this.expToLevelUp) return;

    this.level++;

    this.currentExp = 0;
    this.expToLevelUp = this.calculateExpToLevelUp();

    ctx.events.emitEvent('levelUp');
    ctx.events.emitEvent('experienceUpdate');
  }

  public checkEnemyCollision(enemy: GameEntityObject) {
    const { x, y, width, height } = enemy;

    const leftSide = this.x + this.hitboxPadding < x + width;
    const rightSide = this.x + this.width - this.hitboxPadding > x;
    const topSide = this.y + this.hitboxPadding < y + height;
    const bottomSide = this.y + this.height - this.hitboxPadding > y;

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

  public update(ctx: GameEngine, keys: MovementKeys) {
    this.updateDamageCooldown(ctx.LOGIC_TICK);
    this.handleMovement(ctx.LOGIC_TICK, keys);
    this.handleAttack(ctx);

    this.expRangeCircle.update(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.expPickupRange
    );
  }
}
