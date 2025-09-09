import type GameRenderer from '@/game/core/game-renderer';
import type GameEngine from '@/game/core/game-engine';
import type { PowerUp } from '@/types/power-ups';

import CanvasObjectService from '@/game/services/canvas/canvas-object-service';
import PowerUpCard from '../canvas/power-up-card';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/constants/dimensions';
import { blurBackground } from '@/game/utils/screen-filters';
import { ScreenState } from '@/types/state';

type ClickableCards = {
  powerUp: PowerUp;
  x: number;
  y: number;
  width: number;
  height: number;
};

class PowerUpScreen {
  private objects: CanvasObjectService;
  public clickableCards: Array<ClickableCards>;

  constructor() {
    this.objects = new CanvasObjectService();
    this.clickableCards = [];
  }

  public draw(renderer: GameRenderer, game: GameEngine): void {
    const { ctx } = renderer;
    if (!ctx) return;

    const titleSize = CANVAS_HEIGHT * 0.06;
    const cardWidth = CANVAS_WIDTH * 0.22;
    const cardHeight = CANVAS_HEIGHT * 0.46;
    const cardSpacing = cardWidth * 0.3;
    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;

    const powerUpCards = game.powerUps.currentPowerCards;

    const totalWidth =
      powerUpCards.length * cardWidth + (powerUpCards.length - 1) * cardSpacing;

    const startX = centerX - totalWidth / 2;

    blurBackground(renderer, 10);

    this.objects
      .createText(
        centerX,
        centerY / 2 - 64,
        'YOU LEVELED UP!',
        '#ffffff',
        titleSize
      )
      .draw(ctx);

    for (let i = 0; i < powerUpCards.length; i++) {
      const powerUpCard = powerUpCards[i];

      const cardX = startX + i * (cardWidth + cardSpacing);
      const cardY = centerY - cardHeight / 2;

      const iconSize = Math.min(cardWidth, cardHeight) * 0.35;
      const iconX = cardX + cardWidth / 2 - iconSize / 2;
      const iconY = cardY + cardHeight / 2 - iconSize / 2 - 32;

      this.clickableCards.push({
        powerUp: powerUpCard,
        x: cardX,
        y: cardY,
        width: cardWidth,
        height: cardHeight,
      });

      new PowerUpCard(
        cardX,
        cardY,
        cardWidth,
        cardHeight,
        iconX,
        iconY,
        iconSize
      ).draw(ctx, game, powerUpCard);
    }
  }

  public onClick(game: GameEngine, mouseX: number, mouseY: number): boolean {
    for (const card of this.clickableCards) {
      if (
        mouseX > card.x &&
        mouseX < card.x + card.width &&
        mouseY > card.y &&
        mouseY < card.y + card.height
      ) {
        this.applyPowerUpEffect(game, card.powerUp);
        game.screen.state = ScreenState.GAMEPLAY;
        return true;
      }
    }
    return false;
  }

  private applyPowerUpEffect(game: GameEngine, powerUp: PowerUp): void {
    const { player } = game.state;
    player.inventory.addPowerUp(powerUp);
    powerUp.applyEffect(game);
  }
}

export default PowerUpScreen;
