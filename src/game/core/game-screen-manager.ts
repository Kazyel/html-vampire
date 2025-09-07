import type GameRenderer from '@/game/core/game-renderer';
import type GameManager from '@/game/core/game-manager';

import RenderObjectService from '../services/render/render-object-service';

import {
  MAP_WIDTH,
  MAP_HEIGHT,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from '@/constants/dimensions';
import { blurBackground } from '../utils/filters';

class GameScreenManager {
  private objects: RenderObjectService;

  constructor() {
    this.objects = new RenderObjectService();
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

  public drawPowerUpScreen(renderer: GameRenderer): void {
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
        'YOU LEVELED UP!',
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

  public drawGameplayScreen(
    renderer: GameRenderer,
    gameCtx: GameManager
  ): void {
    const { tempCtx, ctx, canvas, tempCanvas } = renderer;

    const { player, enemies, projectiles, experiencePoints, camera } =
      gameCtx.state;

    if (!ctx || !tempCtx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.save();
    tempCtx.translate(-camera.x, -camera.y);

    player.drawEntity(tempCtx);

    for (const enemy of enemies) {
      enemy.drawEntity(tempCtx);
    }

    for (const experiencePoint of experiencePoints) {
      experiencePoint.drawEntity(tempCtx);
    }

    for (const projectile of projectiles) {
      projectile.draw(tempCtx);
    }

    tempCtx.restore();
  }
}

export default GameScreenManager;
