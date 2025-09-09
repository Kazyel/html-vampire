import type GameEngine from '@/game/core/game-engine';
import type { PowerUp } from '@/types/power-ups';

const FRAME_ASSET = 'flat_frame_default';

class PowerUpCard {
  public cardX: number;
  public cardY: number;
  public cardWidth: number;
  public cardHeight: number;

  public iconX: number;
  public iconY: number;
  public iconSize: number;

  constructor(
    cardX: number,
    cardY: number,
    width: number,
    height: number,
    iconX: number,
    iconY: number,
    iconSize: number
  ) {
    this.cardX = cardX;
    this.cardY = cardY;
    this.cardWidth = width;
    this.cardHeight = height;
    this.iconX = iconX;
    this.iconY = iconY;
    this.iconSize = iconSize;
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    game: GameEngine,
    powerUp: PowerUp
  ): void {
    ctx.imageSmoothingEnabled = false;

    const cardIconAsset = game.assets.getImage(powerUp.iconKey);
    const cardFrameAsset = game.assets.getImage(FRAME_ASSET);

    if (cardIconAsset && cardFrameAsset) {
      ctx.drawImage(
        cardFrameAsset,
        this.cardX,
        this.cardY,
        this.cardWidth,
        this.cardHeight
      );

      ctx.drawImage(
        cardIconAsset,
        this.iconX,
        this.iconY,
        this.iconSize,
        this.iconSize
      );

      game.screen.objects
        .createText(
          this.cardX + this.cardWidth / 2,
          this.cardY + this.iconY - 32,
          powerUp.name,
          '#000',
          32
        )
        .draw(ctx);

      game.screen.objects
        .createText(
          this.cardX + this.cardWidth / 2,
          this.cardY + this.iconY,
          powerUp.description,
          '#000',
          16
        )
        .draw(ctx);
    }

    ctx.imageSmoothingEnabled = true;
  }
}

export default PowerUpCard;
