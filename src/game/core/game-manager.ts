import type GameRenderer from './game-renderer';
import { ScreenState } from '@/types/state';

import GameEventBus from './game-event-bus';
import GameDataState from './game-data-state';
import PlayerInputService from '../services/player/player-input-service';
import GameEnemyManager from './game-enemy-manager';
import initEntityCleaner from '../utils/entity-cleaner';

class GameManager {
  private enemies: GameEnemyManager;
  private inputService: PlayerInputService;
  private lastTimestamp: number;
  private deltaTime: number;
  private logicTimer: number;
  private isPaused: boolean;

  public LOGIC_TICK = 1000 / 60;
  public events: GameEventBus;
  public state: GameDataState;

  private updateGame() {
    const { inputService, state, enemies } = this;
    const { player, camera, collisions } = state;
    const { movementKeys } = inputService;

    player.update(this, movementKeys);
    camera.update(player.x, player.y);
    enemies.update(this);

    collisions.checkProjectileAndEnemyCollisions(this);
    collisions.checkEnemyCollisions(this);
    collisions.checkEnemyHittingPlayer(this);
    collisions.checkPlayerGetsExperience(this);

    initEntityCleaner(this);
  }

  private processGameLogic(): void {
    this.logicTimer += this.deltaTime;

    while (this.logicTimer >= this.LOGIC_TICK) {
      this.updateGame();
      this.logicTimer -= this.LOGIC_TICK;
    }

    this.inputService.clearFrameState();
  }

  constructor() {
    this.inputService = new PlayerInputService();
    this.enemies = new GameEnemyManager();
    this.state = new GameDataState();
    this.events = new GameEventBus();

    this.isPaused = false;
    this.deltaTime = 0;
    this.logicTimer = 0;
    this.lastTimestamp = 0;
  }

  public updateTime(currentTimestamp: number) {
    this.deltaTime = currentTimestamp - this.lastTimestamp;
    this.lastTimestamp = currentTimestamp;
  }

  public pause(renderer: GameRenderer, screen: ScreenState) {
    this.isPaused = true;
    renderer.setScreen(screen);
  }

  public resume(renderer: GameRenderer) {
    this.isPaused = false;
    renderer.setScreen('GAMEPLAY');
  }

  public run(renderer: GameRenderer) {
    if (this.inputService.keyJustPressed('Escape')) {
      switch (renderer.screenState) {
        case ScreenState.POWERUP:
          this.resume(renderer);
          break;
        case ScreenState.PAUSE:
          this.resume(renderer);
          break;
        case ScreenState.GAMEPLAY:
        default:
          this.pause(renderer, ScreenState.PAUSE);
          break;
      }
    }

    if (this.isPaused) {
      this.inputService.clearFrameState();
      return;
    }

    this.processGameLogic();
  }
}

export default GameManager;
