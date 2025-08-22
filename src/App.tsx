import Canvas from "./components/canvas";
import { GameProvider } from "./components/game-context-provider";
import { GameUI } from "./components/game-ui";

function App() {
  return (
    <GameProvider>
      <div className="size-full flex flex-col items-center justify-center">
        <Canvas />
        <GameUI />
      </div>
    </GameProvider>
  );
}

export default App;
