import type GameEngine from './game-engine';

import { ScreenState } from '@/types/state';

class GameRenderer {
  public canvas: HTMLCanvasElement;
  public tempCanvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D | null;
  public tempCtx: CanvasRenderingContext2D | null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.tempCanvas = document.createElement('canvas');
    this.tempCanvas.width = canvas.width;
    this.tempCanvas.height = canvas.height;

    this.ctx = canvas.getContext('2d');
    this.tempCtx = this.tempCanvas.getContext('2d');
  }

  private drawGameplayScreen(gameCtx: GameEngine): void {
    const { tempCtx } = this;
    if (!tempCtx) return;

    const { player, enemies, projectiles, experiencePoints, camera, chests } =
      gameCtx.state;

    tempCtx.clearRect(0, 0, this.tempCanvas.width, this.tempCanvas.height);
    tempCtx.save();
    tempCtx.translate(-camera.x, -camera.y);

    player.drawEntity(tempCtx);
    player.expRangeCircle.drawStroke(tempCtx);

    for (const enemy of enemies) {
      enemy.drawEntity(tempCtx);
    }

    for (const experiencePoint of experiencePoints) {
      experiencePoint.draw(tempCtx, gameCtx.assets);
    }

    for (const chest of chests) {
      chest.draw(tempCtx, gameCtx.assets);
    }

    for (const projectile of projectiles) {
      projectile.draw(tempCtx);
    }

    tempCtx.restore();
  }

  public render(game: GameEngine) {
    if (!this.ctx || !this.tempCtx) {
      console.error('Failed to get 2D rendering context.');
      return;
    }

    this.drawGameplayScreen(game);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    switch (game.screen.state) {
      case ScreenState.PAUSE:
        game.screen.drawPauseScreen(this);
        break;
      case ScreenState.LEVELUP:
        game.screen.levelUpScreen.draw(this, game);
        break;
      case ScreenState.GAMEPLAY:
      default:
        this.ctx.drawImage(this.tempCanvas, 0, 0);
        break;
    }
  }
}

export default GameRenderer;
