import { createContext, useContext } from 'react';
import GameEngine from '@/game/core/game-engine';

const GameContext = createContext<GameEngine | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export default GameContext;
