import type GlobalGameState from "@/classes/game-state";

const render = (canvas: HTMLCanvasElement, ctx: GlobalGameState) => {
  const canvasContext = canvas.getContext("2d");
  if (!canvasContext) {
    return;
  }

  canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
  ctx.player.drawEntity(canvasContext);

  for (const enemy of ctx.enemies) {
    enemy.drawEntity(canvasContext);
  }

  for (const projectile of ctx.projectiles) {
    projectile.drawEntity(canvasContext);
  }
};

export default render;
