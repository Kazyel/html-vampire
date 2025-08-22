import type { GameUIEvent } from "@/types/events";

import Enemy from "./enemy";
import Player from "./player";
import Projectile from "./projectile";
import Camera from "./camera";
import { MAP_HEIGHT, MAP_WIDTH } from "@/constants/dimensions";

interface IGameState {
  player: Player;
  camera: Camera;
  enemies: Array<Enemy>;
  projectiles: Array<Projectile>;
  lastTimestamp: number;
  deltaTime: number;
  logicTimer: number;
  UIListeners: Array<GameUIEvent>;
  LOGIC_TICK: number;

  emitEvent: () => void;
  subscribe: (event: string, callback: () => void) => void;
  unsubscribe: (event: string, callback: () => void) => void;
}

const GAME_LOGIC_TICK = 1000 / 60; // -> 60 FPS

export default class GlobalGameState implements IGameState {
  LOGIC_TICK = GAME_LOGIC_TICK;

  player: Player;
  camera: Camera;
  enemies: Array<Enemy>;
  projectiles: Array<Projectile>;
  lastTimestamp: number;
  deltaTime: number;
  logicTimer: number;
  UIListeners: Array<GameUIEvent>;

  constructor() {
    this.camera = new Camera(0, 0);
    this.player = new Player(MAP_WIDTH / 2, MAP_HEIGHT / 2, "red");
    this.enemies = [new Enemy(0, 0, "blue"), new Enemy(1975, 1175, "blue")];
    this.projectiles = [];

    this.deltaTime = 0;
    this.logicTimer = 0;
    this.lastTimestamp = 0;

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
