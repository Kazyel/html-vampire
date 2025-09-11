import AssetLoader from './asset-loader';

import GameEventBus from './game-event-bus';
import GameDataState from './game-data-state';
import GameEnemyManager from './game-enemy-manager';
import GameScreenManager from './game-screen-manager';
import PlayerInputService from '../services/player/player-input-service';
import PowerUpManager from './cards-manager';
import initEntityCleaner from '../utils/entity-cleaner';

import { ScreenState } from '@/types/state';
import GameRenderer from './game-renderer';

const TICK = 1000 / 60;

class GameEngine {
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

  public renderer: GameRenderer | null;
  private inputService: PlayerInputService | null;

  constructor() {
    this.events = new GameEventBus();
    this.state = new GameDataState();
    this.enemy = new GameEnemyManager();
    this.screen = new GameScreenManager();
    this.powerUps = new PowerUpManager();

    this.LOGIC_TICK = TICK;
    this.deltaTime = 0;
    this.logicTimer = 0;
    this.lastTimestamp = 0;

    this.assets = new AssetLoader();
    this.renderer = null;
    this.inputService = null;
  }

  private updateGame() {
    const { inputService, state, enemy } = this;
    const { player, camera, collisions } = state;
    const { movementKeys } = inputService!;

    player.update(this, movementKeys);
    camera.update(player.x, player.y);
    enemy.update(this);

    collisions.checkProjectileAndEnemyCollisions(this);
    collisions.checkEnemyCollisions(this);
    collisions.checkEnemyHittingPlayer(this);
    collisions.checkPlayerGetsDrops(this);

    initEntityCleaner(this);
  }

  private processGameLogic(): void {
    this.logicTimer += this.deltaTime;

    while (this.logicTimer >= this.LOGIC_TICK) {
      this.updateGame();
      this.logicTimer -= this.LOGIC_TICK;
    }

    this.inputService!.clearFrameState();
  }

  private handleInput(): void {
    if (this.inputService!.isMouseJustClicked) {
      const { x, y } = this.inputService!.mousePosition;

      this.screen.handleInput(this, x, y);
    }

    if (this.inputService!.keyJustPressed('Escape')) {
      if (this.screen.state === ScreenState.LEVELUP) {
        return;
      }

      switch (this.screen.state) {
        case ScreenState.PAUSE:
          this.resume();
          break;
        case ScreenState.GAMEPLAY:
        default:
          this.pause(ScreenState.PAUSE);
          break;
      }
    }
  }

  public updateTime(currentTimestamp: number) {
    this.deltaTime = currentTimestamp - this.lastTimestamp;
    this.lastTimestamp = currentTimestamp;
  }

  public pause(screen: ScreenState) {
    this.screen.state = screen;

    if (screen === ScreenState.LEVELUP) {
      this.powerUps.selectPowerUpCards();
    }
  }

  public resume() {
    this.screen.state = ScreenState.GAMEPLAY;
  }

  public initialize(canvas: HTMLCanvasElement): void {
    if (this.renderer || this.inputService) {
      console.warn('GameEngine already initialized.');
      return;
    }

    this.renderer = new GameRenderer(canvas);
    this.inputService = new PlayerInputService(canvas);
  }

  public run() {
    if (!this.renderer || !this.inputService) {
      console.error('GameEngine has not been initialized with a canvas.');
      return;
    }

    this.handleInput();

    if (this.screen.state !== ScreenState.GAMEPLAY) {
      this.inputService.clearFrameState();
      return;
    }

    this.processGameLogic();
  }
}

export default GameEngine;
