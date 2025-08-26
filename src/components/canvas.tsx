import { useEffect, useRef } from "react";
import { useGameContext } from "@/context/game-context";
import GameRenderer from "@/game/core/game-renderer";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const gameManager = useGameContext();

  useEffect(() => {
    if (!canvasRef.current || !gameManager) {
      return;
    }

    const gameRenderer = new GameRenderer(canvasRef.current);

    const gameLoop = (timestamp: number) => {
      gameManager.updateTime(timestamp);
      gameManager.updateGameLogic();
      gameRenderer.render(gameManager.state);

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameManager]);

  return (
    <canvas
      className="border-2 rounded-md mt-10"
      width={1600}
      height={900}
      ref={canvasRef}
    ></canvas>
  );
};

export default Canvas;
