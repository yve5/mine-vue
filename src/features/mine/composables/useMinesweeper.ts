import { ref } from "vue";
import type { Tile } from "../types/types";

export function useMinesweeper(rows = 10, cols = 10, mineCount = 15) {
  const tiles = ref<Tile[]>([]);
  const gameOver = ref(false);
  const won = ref(false);

  function generateGrid(): Tile[] {
    const grid: Tile[] = Array.from({ length: rows * cols }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacentMines: 0,
    }));

    let placed = 0;
    while (placed < mineCount) {
      const index = Math.floor(Math.random() * grid.length);
      if (!grid[index].mine) {
        grid[index].mine = true;
        placed++;
      }
    }

    for (let i = 0; i < grid.length; i++) {
      const x = i % cols;
      const y = Math.floor(i / cols);
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          const ni = ny * cols + nx;
          if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && grid[ni]?.mine) {
            count++;
          }
        }
      }
      grid[i].adjacentMines = count;
    }

    return grid;
  }

  function revealTile(index: number): void {
    const tile = tiles.value[index];
    if (tile.revealed || tile.flagged || gameOver.value) return;

    tile.revealed = true;

    if (tile.mine) {
      gameOver.value = true;
      revealAllMines();
      return;
    }

    if (tile.adjacentMines === 0) {
      const x = index % cols;
      const y = Math.floor(index / cols);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          const ni = ny * cols + nx;
          if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && ni !== index) {
            revealTile(ni);
          }
        }
      }
    }

    checkWin();
  }

  function toggleFlag(index: number): void {
    const tile = tiles.value[index];
    if (tile.revealed || gameOver.value) return;
    tile.flagged = !tile.flagged;
  }

  function revealAllMines(): void {
    tiles.value.forEach((tile) => {
      if (tile.mine) tile.revealed = true;
    });
  }

  function checkWin(): void {
    if (gameOver.value) return;
    const unrevealed = tiles.value.filter((t) => !t.revealed);
    if (unrevealed.length === mineCount) {
      won.value = true;
      revealAllMines();
    }
  }

  function resetGame(): void {
    tiles.value = generateGrid();
    gameOver.value = false;
    won.value = false;
  }

  // Initialize game
  resetGame();

  return {
    rows,
    cols,
    tiles,
    gameOver,
    won,
    revealTile,
    toggleFlag,
    resetGame,
  };
}
