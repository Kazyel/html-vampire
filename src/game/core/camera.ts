import { MAP_HEIGHT, MAP_WIDTH } from "@/constants/dimensions";

class Camera {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update(playerX: number, playerY: number, canvasWidth: number, canvasHeight: number) {
    const targetX = playerX - canvasWidth / 2;
    const targetY = playerY - canvasHeight / 2;

    this.x = Math.max(0, Math.min(targetX, MAP_WIDTH - canvasWidth));
    this.y = Math.max(0, Math.min(targetY, MAP_HEIGHT - canvasHeight));
  }
}

export default Camera;
