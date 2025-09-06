import type GameManager from './game-manager';

import { ScreenState } from '@/types/state';
import renderBlurBackground from '../services/screen/blur-background';
import renderPauseScreen from '../services/screen/pause-screen';
import renderPowerUpScreen from '../services/screen/power-up-screen';

class GameRenderer {
  private canvas: HTMLCanvasElement;
  private tempCanvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private tempCtx: CanvasRenderingContext2D | null;

  public currentScreen: ScreenState = ScreenState.GAMEPLAY;

  private drawGame(
    gameCtx: GameManager,
    canvasCtx: CanvasRenderingContext2D
  ): void {
    const { player, enemies, projectiles, experiencePoints } = gameCtx.state;
    player.drawEntity(canvasCtx);

    for (const enemy of enemies) {
      enemy.drawEntity(canvasCtx);
    }

    for (const experiencePoint of experiencePoints) {
      experiencePoint.drawEntity(canvasCtx);
    }

    for (const projectile of projectiles) {
      projectile.draw(canvasCtx);
    }
  }

  private drawPauseScreen(): void {
    renderBlurBackground(this.ctx!, this.tempCanvas);
    renderPauseScreen(this.ctx!);
  }

  private drawPowerUpScreen(): void {
    renderBlurBackground(this.ctx!, this.tempCanvas);
    renderPowerUpScreen(this.ctx!);
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.tempCanvas = document.createElement('canvas');
    this.tempCanvas.width = canvas.width;
    this.tempCanvas.height = canvas.height;

    this.ctx = canvas.getContext('2d');
    this.tempCtx = this.tempCanvas.getContext('2d');
  }

  public setScreen(s: ScreenState) {
    this.currentScreen = s;
  }

  public render(game: GameManager) {
    if (!this.ctx || !this.tempCtx) {
      console.error('Failed to get 2D rendering context.');
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.tempCtx.clearRect(0, 0, this.tempCanvas.width, this.tempCanvas.height);
    this.tempCtx.save();

    const { camera } = game.state;
    this.tempCtx.translate(-camera.x, -camera.y);
    this.drawGame(game, this.tempCtx);
    this.tempCtx.restore();

    switch (this.currentScreen) {
      case ScreenState.PAUSE:
        this.drawPauseScreen();
        break;
      case ScreenState.POWERUP:
        this.drawPowerUpScreen();
        break;
      default:
        this.ctx.drawImage(this.tempCanvas, 0, 0);
        break;
    }

    this.tempCtx.restore();
  }
}

export default GameRenderer;
