import { Universe } from "wasm-game-of-life";

const pre = document.getElementById("game-of-life-canvas");
const universe = Universe.new();

let renderCount = 0;
const renderLoop = () => {
  if (renderCount % 6 == 0) {
    pre.textContent = universe.render();
    universe.tick();
  }
  renderCount += 1;
  requestAnimationFrame(renderLoop);
};

requestAnimationFrame(renderLoop);
