import type GameEngine from '@/game/core/game-engine';

import GameEntityObject from './game-entity-object';
import ExperiencePoint from './drops/experience-point';

import { EXPERIENCE_SIZE } from '@/constants/dimensions';

class Enemy extends GameEntityObject {
  public damage: number;
  public health: number;
  public movementSpeed: number;
  public experienceDropValue: number;
  public shouldRemove: boolean;
  public type: 'small' | 'rare';

  constructor(
    x: number,
    y: number,
    color: string,
    damage: number,
    health: number = 20,
    movementSpeed: number = 75,
    experienceDropValue: number = 15,
    type: 'small' | 'rare' = 'small'
  ) {
    super(x, y, color);

    this.health = health;
    this.damage = damage;
    this.experienceDropValue = experienceDropValue;
    this.movementSpeed = movementSpeed;
    this.type = type;

    this.shouldRemove = false;
  }

  public takeDamage(damageTaken: number): void {
    this.health -= damageTaken;
  }

  public attackPlayer(ctx: GameEngine) {
    const { player } = ctx.state;

    const dx = player.x - this.x;
    const dy = player.y - this.y;

    const length = Math.hypot(dx, dy);
    if (length < 1e-8) return;

    const directionX = dx / length;
    const directionY = dy / length;

    this.x += directionX * this.movementSpeed * (ctx.LOGIC_TICK / 1000);
    this.y += directionY * this.movementSpeed * (ctx.LOGIC_TICK / 1000);
  }

  public onDeathUpdate(ctx: GameEngine) {
    this.shouldRemove = true;

    const entityMiddleX = this.x + this.width / 2;
    const entityMiddleY = this.y + this.height / 2;

    const expSpawnX = entityMiddleX - EXPERIENCE_SIZE / 2;
    const expSpawnY = entityMiddleY - EXPERIENCE_SIZE / 2;

    new ExperiencePoint(expSpawnX, expSpawnY, this.experienceDropValue).spawn(
      ctx
    );
  }
}

export default Enemy;
