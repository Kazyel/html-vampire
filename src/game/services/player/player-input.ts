import type { MovementKeys } from "@/types/events";

class PlayerInputService {
  public keysPressed: MovementKeys = {
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
  };

  constructor() {
    this.initEventListeners();
  }

  private initEventListeners() {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      this.keysPressed[e.key as keyof MovementKeys] = true;
    });

    window.addEventListener("keyup", (e: KeyboardEvent) => {
      this.keysPressed[e.key as keyof MovementKeys] = false;
    });
  }
}

export default PlayerInputService;
