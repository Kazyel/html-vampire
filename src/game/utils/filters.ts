import type GameRenderer from '@/game/core/game-renderer';

export const blurBackground = (renderer: GameRenderer, radius: number) => {
  const { ctx, tempCanvas } = renderer;
  if (!ctx) return;

  ctx.filter = `blur(${radius}px)`;
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.filter = 'none';
};
