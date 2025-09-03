import type Player from "./player";

import GameEntityObject from "./game-entity-object";

const DEFAULT_EXP_WIDTH = 10;
const DEFAULT_EXP_HEIGHT = 10;

class ExperiencePoint extends GameEntityObject {
  public shouldRemove: boolean;

  constructor(x: number, y: number) {
    super(x + DEFAULT_EXP_WIDTH / 2, y + DEFAULT_EXP_HEIGHT / 2, "#77ee50");

    this.width = DEFAULT_EXP_WIDTH;
    this.height = DEFAULT_EXP_HEIGHT;

    this.shouldRemove = false;
  }

  public checkPlayerCollision(player: Player): boolean {
    const leftSize = this.x < player.x + player.width;
    const rightSize = this.x + this.width > player.x;
    const topSize = this.y < player.y + player.height;
    const bottomSize = this.y + this.height > player.y;

    const isTouchingX = leftSize && rightSize;
    const isTouchingY = topSize && bottomSize;
    return isTouchingX && isTouchingY;
  }
}

export default ExperiencePoint;
