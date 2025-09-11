import type GameEngine from '@/game/core/game-engine';
import type { WeaponDrop } from '@/types/drops';

const NAME_FONT_SIZE = 32;
const DESCRIPTION_FONT_SIZE = 16;
const FRAME_ASSET = 'flat_frame_default';

class WeaponCard {
  public cardX: number;
  public cardY: number;
  public cardWidth: number;
  public cardHeight: number;
  public weapon: WeaponDrop;

  constructor(
    cardX: number,
    cardY: number,
    width: number,
    height: number,
    weapon: WeaponDrop
  ) {
    this.cardX = cardX;
    this.cardY = cardY;
    this.cardWidth = width;
    this.cardHeight = height;
    this.weapon = weapon;
  }

  public draw(ctx: CanvasRenderingContext2D, game: GameEngine): void {
    ctx.imageSmoothingEnabled = false;

    const cardIconAsset = game.assets.getImage(this.weapon.data.iconKey);
    const cardFrameAsset = game.assets.getImage(FRAME_ASSET);

    if (cardIconAsset && cardFrameAsset) {
      ctx.drawImage(
        cardFrameAsset,
        this.cardX,
        this.cardY,
        this.cardWidth,
        this.cardHeight
      );

      const iconSize = Math.min(this.cardWidth, this.cardHeight) * 0.4;

      const iconX = this.cardX + this.cardWidth / 2 - iconSize / 2;
      const iconY = this.cardY + this.cardHeight * 0.4 - iconSize / 2;

      ctx.drawImage(cardIconAsset, iconX, iconY, iconSize, iconSize);

      game.screen.objects
        .createText(
          this.cardX + this.cardWidth / 2,
          this.cardY + iconY - NAME_FONT_SIZE,
          this.weapon.data.name,
          '#000',
          NAME_FONT_SIZE
        )
        .draw(ctx);

      game.screen.objects
        .createText(
          this.cardX + this.cardWidth / 2,
          this.cardY + iconY,
          this.weapon.data.description,
          '#000',
          DESCRIPTION_FONT_SIZE
        )
        .draw(ctx);
    }

    ctx.imageSmoothingEnabled = true;
  }
}

export default WeaponCard;
