import Projectile from "../models/entities/projectile";
import Player from "../models/entities/player";
import Camera from "./camera";

import EventBus from "./event-bus";
import GameCollisionManager from "../services/game-collision-manager";
import GameDataState from "./game-data-state";
import GameEnemyManager from "../services/game-enemy-manager";
import AttackManager from "../services/player/attack-manager";
import PlayerInputService from "../services/player/player-input";

import entityCleaner from "../utils/rendering/entity-cleaner";
import checkMapBounds from "../utils/check-map-bounds";

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MAP_HEIGHT,
  MAP_WIDTH,
} from "@/constants/dimensions";

const GAME_LOGIC_TICK = 1000 / 60; // -> 60 FPS

class GameManager {
  private collisions: GameCollisionManager;
  private enemies: GameEnemyManager;
  private attackManager: AttackManager;
  private inputService: PlayerInputService;

  private camera: Camera;
  private player: Player;
  private projectiles: Array<Projectile>;

  LOGIC_TICK = GAME_LOGIC_TICK;
  events: EventBus;
  state: GameDataState;

  lastTimestamp: number;
  deltaTime: number;
  logicTimer: number;

  constructor() {
    this.events = new EventBus();
    this.collisions = new GameCollisionManager();
    this.enemies = new GameEnemyManager();
    this.attackManager = new AttackManager();
    this.inputService = new PlayerInputService();

    this.camera = new Camera(0, 0);
    this.player = new Player(MAP_WIDTH / 2, MAP_HEIGHT / 2, "red");
    this.projectiles = [];

    this.deltaTime = 0;
    this.logicTimer = 0;
    this.lastTimestamp = 0;

    this.state = new GameDataState(
      this.camera,
      this.collisions,
      this.player,
      this.enemies,
      this.projectiles
    );
  }

  updateTime(currentTimestamp: number) {
    this.deltaTime = currentTimestamp - this.lastTimestamp;
    this.lastTimestamp = currentTimestamp;
  }

  play() {
    this.logicTimer += this.deltaTime;

    const { player, camera, collisions, enemies } = this.state;
    const keysPressed = this.inputService.keysPressed;

    while (this.logicTimer >= this.LOGIC_TICK) {
      checkMapBounds(player);

      if (keysPressed.ArrowDown) {
        player.walk(0, player.movementSpeed, this.LOGIC_TICK);
      }
      if (keysPressed.ArrowUp) {
        player.walk(0, -player.movementSpeed, this.LOGIC_TICK);
      }
      if (keysPressed.ArrowLeft) {
        player.walk(-player.movementSpeed, 0, this.LOGIC_TICK);
      }
      if (keysPressed.ArrowRight) {
        player.walk(player.movementSpeed, 0, this.LOGIC_TICK);
      }

      camera.update(player.x, player.y, CANVAS_WIDTH, CANVAS_HEIGHT);

      if (enemies.canSpawnWave(this.LOGIC_TICK)) {
        enemies.spawn(this);
      }

      for (const enemy of enemies.spawned) {
        enemy.attackPlayer(this);
      }

      collisions.checkEnemyCollisions(this);
      collisions.checkEnemyHittingPlayer(this);

      this.attackManager.orchestrateAttack(this);
      this.attackManager.updateProjectiles(this);

      this.logicTimer -= this.LOGIC_TICK;
      entityCleaner(this);
    }
  }
}

export default GameManager;
