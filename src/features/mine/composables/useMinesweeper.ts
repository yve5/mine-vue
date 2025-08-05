import type { Tile } from '../resources/types';
import { generateGrid } from '../utils';
import { ref } from 'vue';

export function useMinesweeper(rows = 10, cols = 10, mineCount = 15) {
  const tiles = ref<Tile[]>([]);
  const gameOver = ref(false);
  const won = ref(false);

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

      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
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

    const unrevealed = tiles.value.filter(({ revealed }) => !revealed);

    if (unrevealed.length === mineCount) {
      won.value = true;
      revealAllMines();
    }
  }

  function resetGame(): void {
    tiles.value = generateGrid(10, 10, 15);
    gameOver.value = false;
    won.value = false;
  }

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
