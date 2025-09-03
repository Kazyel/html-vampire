const DEFAULT_GAME_ENTITY_WIDTH = 25; // -> pixels
const DEFAULT_GAME_ENTITY_HEIGHT = 25; // -> pixels
const DEFAULT_GAME_ENTITY_SPEED = 150; // -> pixels
const DEFAULT_GAME_ENTITY_HEALTH = 25;
const DEFAULT_GAME_ENTITY_COLOR = "pink";

class GameEntityObject {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public color: string;
  public health: number;
  public movementSpeed: number;

  constructor(x: number, y: number, color?: string) {
    this.x = x;
    this.y = y;
    this.color = color ?? DEFAULT_GAME_ENTITY_COLOR;

    this.width = DEFAULT_GAME_ENTITY_WIDTH;
    this.height = DEFAULT_GAME_ENTITY_HEIGHT;
    this.health = DEFAULT_GAME_ENTITY_HEALTH;
    this.movementSpeed = DEFAULT_GAME_ENTITY_SPEED;
  }

  public drawEntity = (context: CanvasRenderingContext2D): void => {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  };

  public growEntity(width: number, height: number): void {
    this.width += width;
    this.height += height;
  }
}

export default GameEntityObject;
