import { createContext, useContext } from 'react';
import GameManager from '@/game/core/game-manager';

const GameContext = createContext<GameManager | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export default GameContext;
