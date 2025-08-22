import type GlobalGameState from "@/classes/game-state";

import { useEffect, useRef } from "react";

type AvailableKeys = {
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
};

const usePlayerMovement = () => {
  const keysPressed = useRef<AvailableKeys>({
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
  });

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
