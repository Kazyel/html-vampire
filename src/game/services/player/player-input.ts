import type { BasicKeys, MovementKeys } from '@/types/keyboard';

class PlayerInputService {
  public movementKeys: MovementKeys = {
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
  };

  public basicKeys: BasicKeys = {
    Escape: false,
  };

  private justPressed: Set<string> = new Set();

  private initMovementKeys() {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (
        e.key in this.movementKeys &&
        !this.movementKeys[e.key as keyof MovementKeys]
      ) {
        this.movementKeys[e.key as keyof MovementKeys] = true;
        this.justPressed.add(e.key);
      }
      if (
        e.key in this.basicKeys &&
        !this.basicKeys[e.key as keyof BasicKeys]
      ) {
        this.basicKeys[e.key as keyof BasicKeys] = true;
        this.justPressed.add(e.key);
      }
    });
    window.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.key in this.movementKeys) {
        this.movementKeys[e.key as keyof MovementKeys] = false;
      }

      if (e.key in this.basicKeys) {
        this.basicKeys[e.key as keyof BasicKeys] = false;
      }
    });
  }

  constructor() {
    this.initMovementKeys();
  }

  public keyJustPressed(key: keyof BasicKeys | keyof MovementKeys): boolean {
    return this.justPressed.has(key);
  }

  public clearFrameState() {
    this.justPressed.clear();
  }
}

export default PlayerInputService;
