import { ScreenState } from '@/types/state';
import type GameEventBus from '../core/game-event-bus';
import type GameManager from '../core/game-manager';

class UIEventService {
  private eventBus: GameEventBus;
  private game: GameManager;

  constructor(game: GameManager) {
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
