import type GameManager from './game-manager';

import { ScreenState } from '@/types/state';

import GameScreenManager from './game-screen-manager';

class GameRenderer {
  public canvas: HTMLCanvasElement;
  public tempCanvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D | null;
  public tempCtx: CanvasRenderingContext2D | null;

  public screenState: ScreenState = ScreenState.GAMEPLAY;
  public screens: GameScreenManager;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.tempCanvas = document.createElement('canvas');
    this.tempCanvas.width = canvas.width;
    this.tempCanvas.height = canvas.height;

    this.ctx = canvas.getContext('2d');
    this.tempCtx = this.tempCanvas.getContext('2d');

    this.screens = new GameScreenManager();
  }

  public setScreen(s: ScreenState) {
    this.screenState = s;
  }

  public render(game: GameManager) {
    if (!this.ctx || !this.tempCtx) {
      console.error('Failed to get 2D rendering context.');
      return;
    }

    this.screens.drawGameplayScreen(this, game);

    switch (this.screenState) {
      case ScreenState.PAUSE:
        this.screens.drawPauseScreen(this);
        break;
      case ScreenState.POWERUP:
        this.screens.drawPowerUpScreen(this);
        break;
      default:
        this.ctx.drawImage(this.tempCanvas, 0, 0);
        break;
    }

    this.tempCtx.restore();
  }
}

export default GameRenderer;
