const renderBlurBackground = (
  ctx: CanvasRenderingContext2D,
  tempCanvas: HTMLCanvasElement
) => {
  ctx.filter = "blur(10px)";
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.filter = "none";
};

export default renderBlurBackground;
