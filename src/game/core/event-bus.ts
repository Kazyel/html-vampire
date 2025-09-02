import type { GameUIEvent } from "@/types/events";

class EventBus {
  public listeners: Array<GameUIEvent>;

  constructor() {
    this.listeners = [];
  }


  public emitEvent(event: string): void {
    const targetEvent = this.listeners.findIndex((item) => item.event === event);

    if (targetEvent === -1) {
      return;
    }

    this.listeners[targetEvent].callback();
  }

  public subscribe(event: string, callback: () => void): void {
    this.listeners.push({
      event,
      callback,
    });
  }

  public unsubscribe(event: string, callback: () => void): void {
    const eventIndex = this.listeners.findIndex(
      (item) => item.callback === callback && item.event === event
    );

    if (eventIndex === -1) {
      return;
    }

    this.listeners.splice(eventIndex, 1);
  }
}

export default EventBus;
