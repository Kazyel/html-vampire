import { useEffect, useRef } from "react";
import { useGameContext } from "@/context/game-context";
import GameRenderer from "@/game/core/game-renderer";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const game = useGameContext();

  useEffect(() => {
    if (!canvasRef.current || !game) {
      return;
    }

    const renderer = new GameRenderer(canvasRef.current);

    const gameLoop = (timestamp: number) => {
      game.updateTime(timestamp);
      game.run();
      renderer.render(game);

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
      className="border-2 rounded-md mt-10 border-white/25"
      width={1600}
      height={900}
      ref={canvasRef}
    ></canvas>
  );
};

export default Canvas;
