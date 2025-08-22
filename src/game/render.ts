import type GlobalGameState from "@/classes/game-state";

import { MAP_HEIGHT, MAP_WIDTH } from "@/constants/dimensions";

const render = (canvas: HTMLCanvasElement, ctx: GlobalGameState) => {
  const canvasContext = canvas.getContext("2d");
  if (!canvasContext) {
    return;
  }

  ctx.camera.update(
    ctx.player.x,
    ctx.player.y,
    canvas.width,
    canvas.height,
    MAP_WIDTH,
    MAP_HEIGHT
  );

  canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.save();
  canvasContext.translate(-ctx.camera.x, -ctx.camera.y);

  ctx.player.drawEntity(canvasContext);

  for (const enemy of ctx.enemies) {
    enemy.drawEntity(canvasContext);
  }

  for (const projectile of ctx.projectiles) {
    projectile.drawEntity(canvasContext);
  }

  canvasContext.restore();
};

export default render;
