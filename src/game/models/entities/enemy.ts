import type GameManager from "@/game/core/game-manager";

import GameEntityObject from "./game-entity-object";
import ExperiencePoint from "./experience-point";

class Enemy extends GameEntityObject {
  public damage: number;
  public shouldRemove: boolean;

  constructor(x: number, y: number, color: string) {
    super(x, y, color);

    this.damage = 1;
    this.shouldRemove = false;
  }

  public takeDamage(damageTaken: number): void {
    this.health -= damageTaken;
  }

  public attackPlayer(ctx: GameManager) {
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

  public onDeath(ctx: GameManager) {
    this.shouldRemove = true;
    ctx.state.experiencePoints.push(new ExperiencePoint(this.x, this.y));
  }
}

export default Enemy;
