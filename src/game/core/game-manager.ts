import type GameRenderer from './game-renderer';

import EventBus from './event-bus';
import GameDataState from './game-data-state';
import PlayerInputService from '../services/player/player-input';
import GameEnemyManager from '../services/enemy/game-enemy-manager';

import initEntityCleaner from '../utils/entity-cleaner';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/constants/dimensions';
import { ScreenState } from '@/types/state';

class GameManager {
  private enemies: GameEnemyManager;
  private inputService: PlayerInputService;
  private lastTimestamp: number;
  private deltaTime: number;
  private logicTimer: number;
  private isPaused: boolean;

  public LOGIC_TICK = 1000 / 60;
  public events: EventBus;
  public state: GameDataState;

  private updateGame() {
    const { player, camera, collisions } = this.state;
    const { movementKeys } = this.inputService;

    player.update(this, movementKeys);
    camera.update(player.x, player.y, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.enemies.update(this);

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
    this.enemies = new GameEnemyManager();
    this.inputService = new PlayerInputService();

    this.isPaused = false;
    this.deltaTime = 0;
    this.logicTimer = 0;
    this.lastTimestamp = 0;

    this.state = new GameDataState();
    this.events = new EventBus();
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
      switch (renderer.currentScreen) {
        case 'POWERUP':
          this.resume(renderer);
          break;
        case 'PAUSE':
          this.resume(renderer);
          break;
        case 'GAMEPLAY':
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
