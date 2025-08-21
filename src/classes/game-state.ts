import Player from "./player";

type UIEvent = {
  event: string;
  callback: () => void;
};

interface IGameState {
  player: Player;
  UIListeners: Array<UIEvent>;

  notifyUI: () => void;
  addUIListener: (event: string, callback: () => void) => void;
  removeUIListener: (event: string, callback: () => void) => void;
}

export default class GlobalGameState implements IGameState {
  player: Player;
  UIListeners: Array<UIEvent>;

  constructor() {
    this.player = new Player(0, 0, "red");
    this.UIListeners = [];
  }

  notifyUI(): void {
    for (const event of this.UIListeners) {
      event.callback();
    }
  }

  addUIListener(event: string, callback: () => void): void {
    this.UIListeners.push({
      event,
      callback,
    });
  }

  removeUIListener(event: string, callback: () => void): void {
    const eventIndex = this.UIListeners.findIndex(
      (item) => item.callback === callback && item.event === event
    );

    if (eventIndex === -1) {
      return;
    }

    this.UIListeners.splice(eventIndex, 1);
  }
}
