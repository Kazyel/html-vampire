import { useCallback, useEffect, useRef } from "react";

import GameEntityObject from "../classes/game-entity-object";
import { useGameContext } from "../context/game-context";

type AvailableKeys = {
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
};

const ENEMY_ENTITY = new GameEntityObject(50, 50, "blue");

const Canvas = () => {
  const gameContext = useGameContext();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const enemiesRef = useRef<Array<GameEntityObject>>([ENEMY_ENTITY]);
  const gameStateRef = useRef(gameContext);
  const timeRef = useRef<number>(0);

  const keysPressed = useRef<AvailableKeys>({
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
  });

  const gameLoop = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) {
      return;
    }

    const deltaTime = timestamp - timeRef.current;
    const gameState = gameStateRef.current;
    const player = gameState.player;

    canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
    player.drawEntity(canvasContext);

    if (keysPressed.current.ArrowDown) {
      player.moveEntity(0, player.movementSpeed, deltaTime);
    }
    if (keysPressed.current.ArrowUp) {
      player.moveEntity(0, -player.movementSpeed, deltaTime);
    }
    if (keysPressed.current.ArrowLeft) {
      player.moveEntity(-player.movementSpeed, 0, deltaTime);
    }
    if (keysPressed.current.ArrowRight) {
      player.moveEntity(player.movementSpeed, 0, deltaTime);
    }

    for (const enemy of enemiesRef.current) {
      enemy.drawEntity(canvasContext);
      const hasCollided = player.checkEnemyCollision(enemy);

      if (hasCollided && gameState.player.damageCooldown <= 0) {
        player.takeDamage(1);
        gameState.emitEvent();
      }
    }

    if (player.damageCooldown > 0) {
      player.damageCooldown -= deltaTime;
    }

    timeRef.current = timestamp;
    requestAnimationFrame(gameLoop);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key as keyof AvailableKeys] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key as keyof AvailableKeys] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    gameLoop(timeRef.current);
  }, [gameLoop]);

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
