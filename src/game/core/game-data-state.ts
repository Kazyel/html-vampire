import type Projectile from '@/game/models/entities/projectile';
import type Enemy from '../models/entities/enemy';
import type ExperiencePoint from '../models/entities/experience-point';

import GameCollisionService from '@/game/services/game-collision-service';
import Player from '@/game/models/entities/player';
import Camera from '../models/camera';

import { MAP_HEIGHT, MAP_WIDTH } from '@/constants/dimensions';

class GameDataState {
  public camera: Camera;
  public collisions: GameCollisionService;
  public player: Player;
  public enemies: Array<Enemy>;
  public projectiles: Array<Projectile>;
  public experiencePoints: Array<ExperiencePoint>;

  constructor() {
    this.camera = new Camera(0, 0);
    this.collisions = new GameCollisionService();
    this.player = new Player(MAP_WIDTH / 2, MAP_HEIGHT / 2, 'red');

    this.enemies = [];
    this.projectiles = [];
    this.experiencePoints = [];
  }
}

export default GameDataState;
