import Enemy from "../models/entities/enemy";
import Projectile from "../models/entities/projectile";
import Player from "../models/entities/player";
import Camera from "./camera";
import GameCollisionManager from "../services/game-collision-manager";
import GameDataState from "./game-data-state";
import EventBus from "./event-bus";
import AttackManager from "../services/player/attack-manager";
import checkMapBounds from "../utils/check-map-bounds";
import PlayerInputService from "../services/player/player-input";
import entityCleaner from "../utils/rendering/entity-cleaner";

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MAP_HEIGHT,
  MAP_WIDTH,
} from "@/constants/dimensions";

interface IGameManager {
  state: GameDataState;
  events: EventBus;
  lastTimestamp: number;
  deltaTime: number;
  logicTimer: number;
  LOGIC_TICK: number;
}

const GAME_LOGIC_TICK = 1000 / 60; // -> 60 FPS

class GameManager implements IGameManager {
  private camera: Camera;
  private collisions: GameCollisionManager;
  private player: Player;
  private enemies: Array<Enemy>;
  private projectiles: Array<Projectile>;
  private attackManager: AttackManager;
  private inputService: PlayerInputService;

  LOGIC_TICK = GAME_LOGIC_TICK;
  state: GameDataState;
  events: EventBus;
  lastTimestamp: number;
  deltaTime: number;
  logicTimer: number;

  constructor() {
    this.events = new EventBus();
    this.camera = new Camera(0, 0);
    this.collisions = new GameCollisionManager();
    this.player = new Player(MAP_WIDTH / 2, MAP_HEIGHT / 2, "red");
    this.enemies = [new Enemy(0, 0, "blue"), new Enemy(1975, 1175, "blue")];
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

    this.attackManager = new AttackManager();
    this.inputService = new PlayerInputService();
  }

  updateTime(currentTimestamp: number) {
    this.deltaTime = currentTimestamp - this.lastTimestamp;
    this.lastTimestamp = currentTimestamp;
  }

  updateGameLogic() {
    this.logicTimer += this.deltaTime;

    const { player, camera, collisions } = this.state;
    const keysPressed = this.inputService.keysPressed;

    while (this.logicTimer >= this.LOGIC_TICK) {
      checkMapBounds(player);

      if (keysPressed.ArrowDown) {
        player.moveEntity(0, player.movementSpeed, this.LOGIC_TICK);
      }
      if (keysPressed.ArrowUp) {
        player.moveEntity(0, -player.movementSpeed, this.LOGIC_TICK);
      }
      if (keysPressed.ArrowLeft) {
        player.moveEntity(-player.movementSpeed, 0, this.LOGIC_TICK);
      }
      if (keysPressed.ArrowRight) {
        player.moveEntity(player.movementSpeed, 0, this.LOGIC_TICK);
      }

      camera.update(player.x, player.y, CANVAS_WIDTH, CANVAS_HEIGHT);

      collisions.checkEnemyHittingPlayer(this);

      this.attackManager.orchestrateAttack(this);
      this.attackManager.updateProjectiles(this);

      this.logicTimer -= this.LOGIC_TICK;
      entityCleaner(this);
    }
  }
}

export default GameManager;
