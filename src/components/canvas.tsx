import { useEffect, useRef } from "react";
import { useGameContext } from "@/context/game-context";

import usePlayerMovement from "@/game/player-movement";
import checkAndApplyDamage from "@/game/collision-check";
import render from "@/game/render";

const Canvas = () => {
  const ctx = useGameContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<(timestamp: number) => void | null>(null);

  const movePlayer = usePlayerMovement();

  useEffect(() => {
    gameLoopRef.current = (timestamp: number) => {
      const canvas = canvasRef.current;

      if (!canvas || !ctx) {
        return;
      }

      ctx.updateTime(timestamp);
      render(canvas, ctx);
      movePlayer(ctx.deltaTime, ctx.player);
      checkAndApplyDamage(ctx.enemies, ctx);

      requestAnimationFrame(gameLoopRef.current!);
    };
  });

  useEffect(() => {
    if (!gameLoopRef.current) {
      return;
    }
    gameLoopRef.current(0);
  }, []);

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
