import type GameManager from "./game-manager";

import renderBlurBackground from "../services/ui/blur-background";
import renderPauseScreen from "../services/ui/pause-screen";

class GameRenderer {
  private canvas: HTMLCanvasElement;
  private tempCanvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private tempCtx: CanvasRenderingContext2D | null;

  private drawGame(gameCtx: GameManager, canvasCtx: CanvasRenderingContext2D): void {
    const { player, enemies, projectiles } = gameCtx.state;

    player.drawEntity(canvasCtx);

    for (const enemy of enemies) {
      enemy.drawEntity(canvasCtx);
    }

    for (const projectile of projectiles) {
      projectile.draw(canvasCtx);
    }
  }

  private drawPauseScreen(): void {
    renderBlurBackground(this.ctx!, this.tempCanvas);
    renderPauseScreen(this.ctx!);
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.tempCanvas = document.createElement("canvas");
    this.tempCanvas.width = canvas.width;
    this.tempCanvas.height = canvas.height;

    this.ctx = canvas.getContext("2d");
    this.tempCtx = this.tempCanvas.getContext("2d");
  }

  public render(game: GameManager) {
    if (!this.ctx || !this.tempCtx) {
      return;
    }

    const { camera } = game.state;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.tempCtx.clearRect(0, 0, this.tempCanvas.width, this.tempCanvas.height);

    this.tempCtx.save();
    this.tempCtx.translate(-camera.x, -camera.y);
    this.drawGame(game, this.tempCtx);

    if (game.isPaused) {
      this.drawPauseScreen();
    } else {
      this.ctx.drawImage(this.tempCanvas, 0, 0);
    }

    this.tempCtx.restore();
  }
}

export default GameRenderer;
