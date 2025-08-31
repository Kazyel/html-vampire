import type GameCollisionManager from "@/game/services/game-collision-manager";
import type Player from "@/game/models/entities/player";
import type Projectile from "@/game/models/entities/projectile";
import type Camera from "./camera";
import type GameEnemyManager from "../services/game-enemy-manager";

class GameDataState {
  camera: Camera;
  collisions: GameCollisionManager;
  player: Player;
  enemies: GameEnemyManager;
  projectiles: Projectile[];

  constructor(
    camera: Camera,
    collisions: GameCollisionManager,
    player: Player,
    enemies: GameEnemyManager,
    projectiles: Projectile[]
  ) {
    this.camera = camera;
    this.collisions = collisions;
    this.player = player;
    this.enemies = enemies;
    this.projectiles = projectiles;
  }
}

export default GameDataState;
