import type { AvailableEvents } from '@/types/events';

class EventBus {
  private listeners: Map<AvailableEvents, Array<() => void>> = new Map();

  public on(event: AvailableEvents, callback: () => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  public off(event: AvailableEvents, callback: () => void): void {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event)!;

      const index = callbacks.indexOf(callback);

      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  public emitEvent(event: AvailableEvents): void {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event)!;
      for (const callback of callbacks) {
        callback();
      }
    }
  }
}

export default EventBus;
