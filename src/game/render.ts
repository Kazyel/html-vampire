import type GlobalGameState from "@/classes/game-state";

const render = (canvas: HTMLCanvasElement, gameContext: GlobalGameState) => {
  const canvasContext = canvas.getContext("2d");
  if (!canvasContext) {
    return;
  }

  canvasContext?.clearRect(0, 0, canvas.width, canvas.height);

  gameContext.player.drawEntity(canvasContext);

  for (const enemy of gameContext.enemies) {
    enemy.drawEntity(canvasContext);
  }
};

export default render;
