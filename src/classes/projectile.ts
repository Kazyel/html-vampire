import GameEntityObject from "./game-entity-object";

// interface IProjectile {}

export default class Projectile extends GameEntityObject {
  constructor() {
    super(0, 0, "green");
  }
}
