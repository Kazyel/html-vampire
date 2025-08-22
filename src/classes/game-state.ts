import Player from "./player";

type UIEvent = {
  event: string;
  callback: () => void;
};

interface IGameState {
  player: Player;
  UIListeners: Array<UIEvent>;

  emitEvent: () => void;
  subscribe: (event: string, callback: () => void) => void;
  unsubscribe: (event: string, callback: () => void) => void;
}

const MAP_WIDTH = 1600;
const MAP_HEIGHT = 800;

export default class GlobalGameState implements IGameState {
  player: Player;
  UIListeners: Array<UIEvent>;

  constructor() {
    this.player = new Player(MAP_WIDTH / 2, MAP_HEIGHT / 2, "red");
    this.UIListeners = [];
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
