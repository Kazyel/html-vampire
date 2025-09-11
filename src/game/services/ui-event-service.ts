import type GameEventBus from '../core/game-event-bus';
import type GameEngine from '../core/game-engine';

import { ScreenState } from '@/types/state';

class UIEventService {
  private eventBus: GameEventBus;
  private game: GameEngine;

  constructor(game: GameEngine) {
    this.eventBus = game.events;
    this.game = game;
  }

  private openLevelUpScreen() {
    this.eventBus.on('levelUp', () => {
      this.game.screen.state = ScreenState.LEVELUP;
      this.game.screen.levelUpScreen.createCards(this.game);
      this.game.pause(ScreenState.LEVELUP);
    });
  }

  private openWeaponDropScreen() {
    this.eventBus.on('weaponDrop', () => {
      this.game.screen.state = ScreenState.WEAPONDROP;
      this.game.screen.weaponDropScreen.createCards(this.game);
      this.game.pause(ScreenState.WEAPONDROP);
    });
  }

  private registerListeners() {
    this.openLevelUpScreen();
    this.openWeaponDropScreen();
  }

  public init() {
    this.registerListeners();
  }
}

export default UIEventService;
