import { useEffect, useRef } from "react";
import { useGameContext } from "@/context/game-context";

import usePlayerMovement from "@/game/player-movement";
import { checkEnemyHit } from "@/game/collisions";

import handleProjectiles from "@/game/projectile-handler";
import checkMapBounds from "@/game/check-map-bounds";
import entityCleaner from "@/game/entity-cleaner";
import render from "@/game/render";

const Canvas = () => {
  const ctx = useGameContext();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<(timestamp: number) => void | null>(null);

  const handlePlayerMovement = usePlayerMovement();

  useEffect(() => {
    gameLoopRef.current = (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !ctx) {
        return;
      }

      ctx.updateTime(timestamp);
      ctx.logicTimer += ctx.deltaTime;

      while (ctx.logicTimer >= ctx.LOGIC_TICK) {
        handlePlayerMovement(ctx);
        checkMapBounds(ctx.player);

        checkEnemyHit(ctx);
        handleProjectiles(ctx);

        ctx.logicTimer -= ctx.LOGIC_TICK;
      }

      entityCleaner(ctx);
      render(canvas, ctx);
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
