import Player from "../models/entities/player";
import Camera from "./camera";
import EventBus from "./event-bus";
import GameCollisionManager from "../services/game-collision-manager";
import GameDataState from "./game-data-state";
import PlayerInputService from "../services/player/player-input";

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MAP_HEIGHT,
  MAP_WIDTH,
} from "@/constants/dimensions";

import initEntityCleaner from "../utils/rendering/entity-cleaner";
import GameEnemyManager from "../services/enemy/game-enemy-manager";

class GameManager {
  private collisions: GameCollisionManager;
  private enemies: GameEnemyManager;
  private inputService: PlayerInputService;
  private camera: Camera;
  private player: Player;
  private isPaused: boolean;
  private lastTimestamp: number;
  private deltaTime: number;
  private logicTimer: number;

  public LOGIC_TICK = 1000 / 60;
  public events: EventBus;
  public state: GameDataState;

  private update() {
    const { player, camera, collisions } = this.state;
    const { movementKeys } = this.inputService;

    player.update(this, movementKeys);
    camera.update(player.x, player.y, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.enemies.update(this);

    collisions.checkEnemyCollisions(this);
    collisions.checkEnemyHittingPlayer(this);

    initEntityCleaner(this);
  }

  private processGameLogic(): void {
    this.logicTimer += this.deltaTime;

    while (this.logicTimer >= this.LOGIC_TICK) {
      this.update();
      this.logicTimer -= this.LOGIC_TICK;
    }

    this.inputService.clearFrameState();
  }

  constructor() {
    this.collisions = new GameCollisionManager();
    this.enemies = new GameEnemyManager();
    this.inputService = new PlayerInputService();
    this.camera = new Camera(0, 0);
    this.player = new Player(MAP_WIDTH / 2, MAP_HEIGHT / 2, "red");
    this.isPaused = false;
    this.deltaTime = 0;
    this.logicTimer = 0;
    this.lastTimestamp = 0;

    this.state = new GameDataState(this.camera, this.collisions, this.player);
    this.events = new EventBus();
  }

  public updateTime(currentTimestamp: number) {
    this.deltaTime = currentTimestamp - this.lastTimestamp;
    this.lastTimestamp = currentTimestamp;
  }

  public run() {
    if (this.inputService.keyJustPressed("Escape")) {
      this.isPaused = !this.isPaused;
    }

    if (this.isPaused) {
      this.inputService.clearFrameState();
      return;
    }

    this.processGameLogic();
  }
}

export default GameManager;
