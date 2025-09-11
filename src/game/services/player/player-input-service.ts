import type { BasicKeys, MouseInput, MovementKeys } from '@/types/inputs';

class PlayerInputService {
  private justPressed: Set<string> = new Set();
  private canvas: HTMLCanvasElement;

  public movementKeys: MovementKeys;
  public basicKeys: BasicKeys;

  public mousePosition: MouseInput;
  public isMouseJustClicked: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.isMouseJustClicked = false;

    this.movementKeys = {
      w: false,
      a: false,
      s: false,
      d: false,
    };

    this.basicKeys = {
      Escape: false,
    };

    this.mousePosition = { x: 0, y: 0 };

    this.initKeyboard();
    this.initMouse();
  }

  private initMouse() {
    if (!this.canvas) {
      console.warn("Canvas not found, mouse input won't work");
      return;
    }

    this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = this.canvas!.getBoundingClientRect();
      this.mousePosition.x = e.clientX - rect.left;
      this.mousePosition.y = e.clientY - rect.top;
    });

    this.canvas.addEventListener('mousedown', () => {
      this.isMouseJustClicked = true;
    });
  }

  private initKeyboard() {
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

  public keyJustPressed(key: keyof BasicKeys | keyof MovementKeys): boolean {
    return this.justPressed.has(key);
  }

  public clearFrameState() {
    this.isMouseJustClicked = false;
    this.justPressed.clear();
  }
}

export default PlayerInputService;
