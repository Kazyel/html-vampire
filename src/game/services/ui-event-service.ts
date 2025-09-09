import { ScreenState } from '@/types/state';
import type GameEventBus from '../core/game-event-bus';
import type GameEngine from '../core/game-engine';

class UIEventService {
  private eventBus: GameEventBus;
  private game: GameEngine;

  constructor(game: GameEngine) {
    this.eventBus = game.events;
    this.game = game;
  }

  private openPowerUpScreen() {
    this.eventBus.on('levelUp', () => {
      this.game.screen.state = ScreenState.POWERUP;
      this.game.pause(ScreenState.POWERUP);
    });
  }

  private registerListeners() {
    this.openPowerUpScreen();
  }

  public init() {
    this.registerListeners();
  }
}

export default UIEventService;
