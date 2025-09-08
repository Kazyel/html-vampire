import type AssetLoader from './asset-loader';

import GameEventBus from './game-event-bus';
import GameDataState from './game-data-state';
import GameEnemyManager from './game-enemy-manager';
import GameScreenManager from './game-screen-manager';
import PlayerInputService from '../services/player/player-input-service';
import PowerUpManager from './power-up-manager';
import initEntityCleaner from '../utils/entity-cleaner';

import { ScreenState } from '@/types/state';

const TICK = 1000 / 60;

class GameManager {
  private inputService: PlayerInputService;
  private lastTimestamp: number;
  private deltaTime: number;
  private logicTimer: number;
  private enemy: GameEnemyManager;

  public LOGIC_TICK: number;
  public events: GameEventBus;
  public state: GameDataState;
  public screen: GameScreenManager;
  public powerUps: PowerUpManager;
  public assets: AssetLoader;

  constructor(assets: AssetLoader) {
    this.events = new GameEventBus();
    this.inputService = new PlayerInputService();
    this.state = new GameDataState();

    this.enemy = new GameEnemyManager();
    this.screen = new GameScreenManager();
    this.powerUps = new PowerUpManager();

    this.assets = assets;

    this.LOGIC_TICK = TICK;
    this.deltaTime = 0;
    this.logicTimer = 0;
    this.lastTimestamp = 0;
  }

  private updateGame() {
    const { inputService, state, enemy } = this;
    const { player, camera, collisions } = state;
    const { movementKeys } = inputService;

    player.update(this, movementKeys);
    camera.update(player.x, player.y);
    enemy.update(this);

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

  public updateTime(currentTimestamp: number) {
    this.deltaTime = currentTimestamp - this.lastTimestamp;
    this.lastTimestamp = currentTimestamp;
  }

  public pause(screen: ScreenState) {
    this.screen.state = screen;

    if (screen === ScreenState.POWERUP) {
      this.powerUps.selectPowerUpCards();
    }
  }

  public resume() {
    this.screen.state = ScreenState.GAMEPLAY;
  }

  public run() {
    if (this.inputService.keyJustPressed('Escape')) {
      switch (this.screen.state) {
        case ScreenState.POWERUP:
          this.resume();
          break;
        case ScreenState.PAUSE:
          this.resume();
          break;
        case ScreenState.GAMEPLAY:
        default:
          this.pause(ScreenState.PAUSE);
          break;
      }
    }

    if (this.screen.state !== ScreenState.GAMEPLAY) {
      this.inputService.clearFrameState();
      return;
    }

    this.processGameLogic();
  }
}

export default GameManager;
