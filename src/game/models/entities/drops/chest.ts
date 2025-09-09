import type GameEngine from '@/game/core/game-engine';
import type AssetLoader from '@/game/core/asset-loader';

import GameEntityObject from '../game-entity-object';
import { NORMAL_CHEST_SIZE } from '@/constants/dimensions';

class Chest extends GameEntityObject {
  public shouldRemove: boolean;

  constructor(x: number, y: number) {
    super(x, y);

    this.width = NORMAL_CHEST_SIZE;
    this.height = NORMAL_CHEST_SIZE;

    this.shouldRemove = false;
  }

  public spawn(ctx: GameEngine): void {
    const { chests } = ctx.state;
    chests.push(this);
  }

  public draw(canvasCtx: CanvasRenderingContext2D, assets: AssetLoader): void {
    const sprite = assets.getImage('chest_normal');
    if (!sprite) return;

    canvasCtx.imageSmoothingEnabled = false;
    canvasCtx.drawImage(sprite, this.x, this.y, this.width, this.height);
    canvasCtx.imageSmoothingEnabled = true;
  }
}

export default Chest;
