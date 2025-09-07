import { useEffect, useRef } from 'react';
import { useGameContext } from '@/context/game-context';

import GameRenderer from '@/game/core/game-renderer';
import UIEventService from '@/game/services/ui-event-service';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/constants/dimensions';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const game = useGameContext();

  useEffect(() => {
    if (!canvasRef.current || !game) {
      return;
    }

    const screen = new GameRenderer(canvasRef.current);
    const uiEvents = new UIEventService(game, screen);

    const gameLoop = (timestamp: number) => {
      game.updateTime(timestamp);
      game.run(screen);
      screen.render(game);

      uiEvents.init();

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [game]);

  return (
    <canvas
      className="border-2 rounded-md mt-4 border-white/25"
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      ref={canvasRef}
    />
  );
};

export default Canvas;
