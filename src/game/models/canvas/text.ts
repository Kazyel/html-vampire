class Text {
  public x: number;
  public y: number;
  public text: string;
  public color: string;
  public fontSize: number;
  public fontFamily: string;

  constructor(
    x: number,
    y: number,
    text: string,
    color: string,
    fontSize: number = 16,
    fontFamily: string = 'sans'
  ) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
  }

  public draw(canvasCtx: CanvasRenderingContext2D): void {
    canvasCtx.font = `bold ${this.fontSize}px ${this.fontFamily}`;

    canvasCtx.textAlign = 'center';

    canvasCtx.fillStyle = this.color;
    canvasCtx.fillText(this.text, this.x, this.y);
  }
}

export default Text;
