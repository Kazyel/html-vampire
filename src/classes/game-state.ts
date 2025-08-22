import Enemy from "./enemy";
import Player from "./player";
import Projectile from "./projectile";

type UIEvent = {
  event: string;
  callback: () => void;
};

interface IGameState {
  player: Player;
  enemies: Array<Enemy>;
  projectiles: Array<Projectile>;
  lastTimestamp: number;
  deltaTime: number;
  logicTimer: number;
  UIListeners: Array<UIEvent>;

  emitEvent: () => void;
  subscribe: (event: string, callback: () => void) => void;
  unsubscribe: (event: string, callback: () => void) => void;
}

const MAP_WIDTH = 1600;
const MAP_HEIGHT = 800;

export default class GlobalGameState implements IGameState {
  LOGIC_TICK = 1000 / 60;

  player: Player;
  enemies: Array<Enemy>;
  projectiles: Array<Projectile>;
  lastTimestamp: number;
  deltaTime: number;
  logicTimer: number;

  UIListeners: Array<UIEvent>;

  constructor() {
    this.player = new Player(MAP_WIDTH / 2, MAP_HEIGHT / 2, "red");
    this.enemies = [new Enemy(50, 50, "blue"), new Enemy(1300, 50, "blue")];
    this.projectiles = [];

    this.lastTimestamp = 0;
    this.deltaTime = 0;
    this.logicTimer = 0;

    this.UIListeners = [];
  }

  updateTime(currentTimestamp: number) {
    this.deltaTime = currentTimestamp - this.lastTimestamp;
    this.lastTimestamp = currentTimestamp;
  }

  emitEvent(): void {
    for (const event of this.UIListeners) {
      event.callback();
    }
  }

  subscribe(event: string, callback: () => void): void {
    this.UIListeners.push({
      event,
      callback,
    });
  }

  unsubscribe(event: string, callback: () => void): void {
    const eventIndex = this.UIListeners.findIndex(
      (item) => item.callback === callback && item.event === event
    );

    if (eventIndex === -1) {
      return;
    }

    this.UIListeners.splice(eventIndex, 1);
  }
}
