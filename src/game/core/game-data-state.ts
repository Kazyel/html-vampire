import type GameCollisionManager from "@/game/services/game-collision-manager";
import type Player from "@/game/models/entities/player";
import type Projectile from "@/game/models/entities/projectile";
import type Camera from "./camera";
import type Enemy from "../models/entities/enemy";

class GameDataState {
  public camera: Camera;
  public collisions: GameCollisionManager;
  public player: Player;
  public enemies: Array<Enemy>;
  public projectiles: Projectile[];

  constructor(camera: Camera, collisions: GameCollisionManager, player: Player) {
    this.camera = camera;
    this.collisions = collisions;
    this.player = player;
    this.enemies = [];
    this.projectiles = [];
  }
}

export default GameDataState;
