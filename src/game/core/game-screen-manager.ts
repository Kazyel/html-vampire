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
import type GameManager from './game-manager';

class GameScreenManager {
  private objects: CanvasObjectService;
  public state: ScreenState;

  constructor() {
    this.objects = new CanvasObjectService();
    this.state = ScreenState.GAMEPLAY;
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

  public drawPowerUpScreen(renderer: GameRenderer, game: GameManager): void {
    const { ctx } = renderer;
    if (!ctx) return;

    const { powerUps, assets } = game;
    const powerUpCards = powerUps.powerUpCards;

    const titleSize = CANVAS_HEIGHT * 0.06;
    const cardWidth = CANVAS_WIDTH * 0.22;
    const cardHeight = CANVAS_HEIGHT * 0.46;
    const cardSpacing = cardWidth * 0.3;

    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;

    blurBackground(renderer, 10);

    this.objects
      .createText(
        centerX,
        centerY - cardHeight / 2 - 64,
        'YOU LEVELED UP!',
        '#ffffff',
        titleSize
      )
      .draw(ctx);

    const totalWidth =
      powerUpCards.length * cardWidth + (powerUpCards.length - 1) * cardSpacing;

    const startX = centerX - totalWidth / 2;

    ctx.imageSmoothingEnabled = false;

    for (let i = 0; i < powerUpCards.length; i++) {
      const cardIconAsset = assets.getImage(powerUpCards[i].iconKey);

      if (cardIconAsset) {
        const cardX = startX + i * (cardWidth + cardSpacing);
        const cardY = centerY - cardHeight / 2;

        const cardFrameAsset = assets.getImage(`flat_frame_default`);
        if (cardFrameAsset) {
          ctx.drawImage(cardFrameAsset, cardX, cardY, cardWidth, cardHeight);
        }

        const iconSize = Math.min(cardWidth, cardHeight) * 0.35;
        const iconX = cardX + cardWidth / 2 - iconSize / 2;
        const iconY = cardY + cardHeight / 2 - iconSize / 2 - 32;
        ctx.drawImage(cardIconAsset, iconX, iconY, iconSize, iconSize);

        this.objects
          .createText(
            cardX + cardWidth / 2,
            cardY + iconY - 32,
            powerUpCards[i].name,
            '#000',
            32
          )
          .draw(ctx);

        this.objects
          .createText(
            cardX + cardWidth / 2,
            cardY + iconY,
            powerUpCards[i].description,
            '#000',
            16
          )
          .draw(ctx);
      }
    }

    ctx.imageSmoothingEnabled = true;
  }
}

export default GameScreenManager;
