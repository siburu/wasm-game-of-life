import { Universe, Cell } from "wasm-game-of-life";
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg";

const CELL_SIZE = 5;
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#000000";
const ALIVE_COLOR = "#FFFFFF";

const universe = Universe.new();
const width = universe.width();
const height = universe.height();

const canvas = document.getElementById("game-of-life-canvas");
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext('2d');

const drawGrid = () => {
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;

  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, height * (CELL_SIZE + 1) + 1);
  }

  for (let i = 0; i <= height; i++) {
    ctx.moveTo(0,                           i * (CELL_SIZE + 1) + 1);
    ctx.lineTo(width * (CELL_SIZE + 1) + 1, i * (CELL_SIZE + 1) + 1)
  }

  ctx.stroke();
};

const getIndex = (row, column) => {
  return row * width + column;
}

const drawCells = () => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  ctx.beginPath();

  for (let row = 0; row <= height; row++) {
    for (let col = 0; col <= width; col++) {
      const idx = getIndex(row, col);

      ctx.fillStyle = cells[idx] === Cell.Alive
        ? DEAD_COLOR
        : ALIVE_COLOR;

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.stroke();
};

let renderCount = 0;
const renderLoop = () => {
  if (renderCount % 6 == 0) {
    universe.tick();

    drawGrid();
    drawCells();
  }
  renderCount += 1;
  requestAnimationFrame(renderLoop);
};

drawGrid();
drawCells();
requestAnimationFrame(renderLoop);
