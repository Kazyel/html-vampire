class Circle {
  public x: number;
  public y: number;
  public radius: number;

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  public update(x: number, y: number, radius: number): void {
    this.radius = radius;
    this.x = x;
    this.y = y;
  }

  public drawStroke(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = '#ffffff66';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }

  public drawFill(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#ffffff66';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }
}

export default Circle;
