class Rectangle {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public draw(canvasCtx: CanvasRenderingContext2D, color: string): void {
    canvasCtx.fillStyle = color;
    canvasCtx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Rectangle;
