const DEFAULT_GAME_ENTITY_WIDTH = 25; // -> pixels
const DEFAULT_GAME_ENTITY_HEIGHT = 25; // -> pixels
const DEFAULT_GAME_ENTITY_SPEED = 100; // -> pixels
const DEFAULT_GAME_ENTITY_HEALTH = 25;

class GameEntityObject {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  health: number;
  movementSpeed: number;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.width = DEFAULT_GAME_ENTITY_WIDTH;
    this.height = DEFAULT_GAME_ENTITY_HEIGHT;
    this.health = DEFAULT_GAME_ENTITY_HEALTH;
    this.movementSpeed = DEFAULT_GAME_ENTITY_SPEED;
  }

  drawEntity = (context: CanvasRenderingContext2D): void => {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  };

  growEntity(width: number, height: number): void {
    this.width += width;
    this.height += height;
  }
}

export default GameEntityObject;
