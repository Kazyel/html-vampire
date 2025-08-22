import type Player from "@/classes/player";

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

  const movePlayer = (deltaTime: number, player: Player) => {
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
  };

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

  return movePlayer;
};

export default usePlayerMovement;
