import type GameManager from "./game-manager";

class GameRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  public render(game: GameManager) {
    if (!this.ctx) {
      return;
    }

    const { player, camera, enemies, projectiles } = game.state;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(-camera.x, -camera.y);

    player.drawEntity(this.ctx);

    for (const enemy of enemies) {
      enemy.drawEntity(this.ctx);
    }

    for (const projectile of projectiles) {
      projectile.drawEntity(this.ctx);
    }

    this.ctx.restore();
  }
}

export default GameRenderer;
