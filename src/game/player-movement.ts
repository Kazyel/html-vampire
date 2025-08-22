import type GlobalGameState from "@/classes/game-state";
import type { MovementKeys } from "@/types/events";

import { useEffect, useRef } from "react";

const usePlayerMovement = () => {
  const keysPressed = useRef<MovementKeys>({
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key as keyof MovementKeys] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key as keyof MovementKeys] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (ctx: GlobalGameState) => {
    const { player, LOGIC_TICK } = ctx;
    const key = keysPressed.current;

    if (key.ArrowDown) {
      player.moveEntity(0, player.movementSpeed, LOGIC_TICK);
    }
    if (key.ArrowUp) {
      player.moveEntity(0, -player.movementSpeed, LOGIC_TICK);
    }
    if (key.ArrowLeft) {
      player.moveEntity(-player.movementSpeed, 0, LOGIC_TICK);
    }
    if (key.ArrowRight) {
      player.moveEntity(player.movementSpeed, 0, LOGIC_TICK);
    }
  };
};

export default usePlayerMovement;
