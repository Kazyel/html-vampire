import type GameRenderer from '@/game/core/game-renderer';
import type GameEngine from './game-engine';

import CanvasObjectService from '../services/canvas/canvas-object-service';
import LevelUpScreen from '../models/screens/level-up-screen';
import WeaponDropScreen from '../models/screens/weapon-drop-screen';

import { blurBackground } from '../utils/screen-filters';
import { ScreenState } from '@/types/state';
import {
  MAP_WIDTH,
  MAP_HEIGHT,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from '@/constants/dimensions';

class GameScreenManager {
  public objects: CanvasObjectService;
  public state: ScreenState;
  public levelUpScreen: LevelUpScreen;
  public weaponDropScreen: WeaponDropScreen;

  constructor() {
    this.objects = new CanvasObjectService();
    this.state = ScreenState.GAMEPLAY;

    this.levelUpScreen = new LevelUpScreen();
    this.weaponDropScreen = new WeaponDropScreen();
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
      case ScreenState.LEVELUP:
        this.levelUpScreen.onClick(game, mouseX, mouseY);
        break;
      default:
        break;
    }
  }
}

export default GameScreenManager;
