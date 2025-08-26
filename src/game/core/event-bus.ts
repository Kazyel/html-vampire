import type { GameUIEvent } from "@/types/events";

class EventBus {
  listeners: Array<GameUIEvent>;

  constructor() {
    this.listeners = [];
  }

  emitEvent(): void {
    for (const event of this.listeners) {
      event.callback();
    }
  }

  subscribe(event: string, callback: () => void): void {
    this.listeners.push({
      event,
      callback,
    });
  }

  unsubscribe(event: string, callback: () => void): void {
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
