import type GameManager from "@/game/core/game-manager";
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

  attackPlayer(ctx: GameManager) {
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
}

export default Enemy;
