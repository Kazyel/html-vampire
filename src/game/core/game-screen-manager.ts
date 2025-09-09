import type GameRenderer from '@/game/core/game-renderer';

import CanvasObjectService from '../services/canvas/canvas-object-service';

import { blurBackground } from '../utils/screen-filters';
import { ScreenState } from '@/types/state';
import {
  MAP_WIDTH,
  MAP_HEIGHT,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from '@/constants/dimensions';
import PowerUpScreen from '../models/screens/power-up-screen';
import type GameEngine from './game-engine';

class GameScreenManager {
  public objects: CanvasObjectService;
  public state: ScreenState;
  public powerUpScreen: PowerUpScreen;

  constructor() {
    this.objects = new CanvasObjectService();
    this.state = ScreenState.GAMEPLAY;

    this.powerUpScreen = new PowerUpScreen();
  }

  public drawPauseScreen(renderer: GameRenderer): void {
    const { ctx } = renderer;
    if (!ctx) return;

    const titleSize = 48;
    const subtextSize = 16;
    const backgroundColor = '#00000055';

    blurBackground(renderer, 10);

    this.objects
      .createRect(0, 0, MAP_WIDTH, MAP_HEIGHT)
      .draw(ctx, backgroundColor);

    this.objects
      .createText(
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT / 2,
        'GAME PAUSED',
        '#ffffff',
        titleSize
      )
      .draw(ctx);

    this.objects
      .createText(
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT / 2 + titleSize,
        'Press ESC to resume the game.',
        '#ffffff',
        subtextSize
      )
      .draw(ctx);
  }

  public handleInput(game: GameEngine, mouseX: number, mouseY: number): void {
    switch (game.screen.state) {
      case ScreenState.POWERUP:
        this.powerUpScreen.onClick(game, mouseX, mouseY);
        this.powerUpScreen.clickableCards = [];
        break;
      default:
        break;
    }
  }
}

export default GameScreenManager;
