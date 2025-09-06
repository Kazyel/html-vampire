import { ScreenState } from '@/types/state';
import type EventBus from '../core/event-bus';
import type GameManager from '../core/game-manager';
import type GameRenderer from '../core/game-renderer';

class UIEventHandler {
  private eventBus: EventBus;
  private renderer: GameRenderer;
  private game: GameManager;

  constructor(game: GameManager, renderer: GameRenderer) {
    this.renderer = renderer;
    this.eventBus = game.events;
    this.game = game;
  }

  private openPowerUpScreen() {
    this.eventBus.on('levelUp', () => {
      this.renderer.setScreen(ScreenState.POWERUP);
      this.game.pause(this.renderer, ScreenState.POWERUP);
    });
  }

  private registerListeners() {
    this.openPowerUpScreen();
  }

  public init() {
    this.registerListeners();
  }
}

export default UIEventHandler;
