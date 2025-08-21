import Canvas from "./components/canvas";
import { GameProvider } from "./components/game-context-provider";
import { GameUI } from "./components/game-ui";

function App() {
  return (
    <GameProvider>
      <Canvas />
      <GameUI />
    </GameProvider>
  );
}

export default App;
