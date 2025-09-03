import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MAP_HEIGHT,
  MAP_WIDTH,
} from "@/constants/dimensions";

const renderPauseScreen = (canvasCtx: CanvasRenderingContext2D) => {
  const titleSize = 48;
  const subtextSize = 16;

  canvasCtx.fillStyle = "#00000055";
  canvasCtx.fillRect(0, 0, MAP_WIDTH, MAP_HEIGHT);

  canvasCtx.font = `bold ${titleSize}px sans`;
  canvasCtx.textAlign = "center";
  canvasCtx.fillStyle = "#ffffff";
  canvasCtx.fillText("Game Paused", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

  canvasCtx.font = `bold ${subtextSize}px sans`;
  canvasCtx.textAlign = "center";
  canvasCtx.fillStyle = "#ffffff";
  canvasCtx.fillText(
    `Press ESC to resume the game.`,
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2 + titleSize
  );
};

export default renderPauseScreen;
