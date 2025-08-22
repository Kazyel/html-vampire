interface ICamera {
  x: number;
  y: number;
}

export default class Camera implements ICamera {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update(
    playerX: number,
    playerY: number,
    canvasWidth: number,
    canvasHeight: number,
    mapWidth: number,
    mapHeight: number
  ) {
    const targetX = playerX - canvasWidth / 2;
    const targetY = playerY - canvasHeight / 2;

    this.x = Math.max(0, Math.min(targetX, mapWidth - canvasWidth));
    this.y = Math.max(0, Math.min(targetY, mapHeight - canvasHeight));
  }
}
