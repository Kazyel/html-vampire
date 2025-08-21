interface IGameEntity {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;

  health: number;
  movementSpeed: number;

  drawEntity: (context: CanvasRenderingContext2D) => void;
  moveEntity: (x: number, y: number, deltaTime: number) => void;
  growEntity: (width: number, height: number) => void;
  takeDamage: (damage: number) => void;
}

const DEFAULT_GAME_ENTITY_WIDTH = 25;
const DEFAULT_GAME_ENTITY_HEIGHT = 25;
const DEFAULT_GAME_ENTITY_HEALTH = 25;

export default class GameEntityObject implements IGameEntity {
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
    this.width = DEFAULT_GAME_ENTITY_WIDTH;
    this.height = DEFAULT_GAME_ENTITY_HEIGHT;
    this.color = color;

    this.health = DEFAULT_GAME_ENTITY_HEALTH;
    this.movementSpeed = 50;
  }

  drawEntity = (context: CanvasRenderingContext2D): void => {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  };

  moveEntity(x: number, y: number, deltaTime: number): void {
    this.x += x * (deltaTime / 1000);
    this.y += y * (deltaTime / 1000);
  }

  growEntity(width: number, height: number): void {
    this.width += width;
    this.height += height;
  }

  takeDamage(damageTaken: number): void {
    this.health -= damageTaken;
  }
}
