import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MAP_HEIGHT,
  MAP_WIDTH,
} from '@/constants/dimensions';

class Camera {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public update(playerX: number, playerY: number) {
    const targetX = playerX - CANVAS_WIDTH / 2;
    const targetY = playerY - CANVAS_HEIGHT / 2;

    this.x = Math.max(0, Math.min(targetX, MAP_WIDTH - CANVAS_WIDTH));
    this.y = Math.max(0, Math.min(targetY, MAP_HEIGHT - CANVAS_HEIGHT));
  }
}

export default Camera;
