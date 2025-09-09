import type Player from '../player';
import type AssetLoader from '@/game/core/asset-loader';
import type GameEngine from '@/game/core/game-engine';

import GameEntityObject from '../game-entity-object';

import { EXPERIENCE_SIZE } from '@/constants/dimensions';

class ExperiencePoint extends GameEntityObject {
  public shouldRemove: boolean;
  public value: number;

  constructor(x: number, y: number, value: number = 30) {
    super(x, y);

    this.width = EXPERIENCE_SIZE;
    this.height = EXPERIENCE_SIZE;

    this.value = value;
    this.shouldRemove = false;
  }

  public spawn(ctx: GameEngine): void {
    const { experiencePoints } = ctx.state;
    experiencePoints.push(this);
  }

  public draw(canvasCtx: CanvasRenderingContext2D, assets: AssetLoader): void {
    const sprite = assets.getImage('experience');
    if (!sprite) return;

    canvasCtx.imageSmoothingEnabled = false;
    canvasCtx.drawImage(sprite, this.x, this.y, this.width, this.height);
    canvasCtx.imageSmoothingEnabled = true;
  }

  public checkPlayerExpRange(player: Player): boolean {
    const { expRangeCircle } = player;

    const closestX = Math.max(
      this.x,
      Math.min(expRangeCircle.x, this.x + this.width)
    );
    const closestY = Math.max(
      this.y,
      Math.min(expRangeCircle.y, this.y + this.height)
    );

    const distanceX = expRangeCircle.x - closestX;
    const distanceY = expRangeCircle.y - closestY;

    const distanceSquared = distanceX * distanceX + distanceY * distanceY;
    const radiusSquared = expRangeCircle.radius * expRangeCircle.radius;

    return distanceSquared <= radiusSquared;
  }
}

export default ExperiencePoint;
