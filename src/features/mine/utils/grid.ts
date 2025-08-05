import type { Tile } from '../resources/types';

export const generateGrid = (rows: number, cols: number, mineCount: number): Tile[] => {
  const grid: Tile[] = Array.from({ length: rows * cols }, () => ({
    mine: false,
    revealed: false,
    flagged: false,
    adjacentMines: 0,
  }));

  let placed: number = 0;

  while (placed < mineCount) {
    const index = Math.floor(Math.random() * grid.length);

    if (!grid[index].mine) {
      grid[index].mine = true;
      placed += 1;
    }
  }

  for (let i = 0; i < grid.length; i += 1) {
    const x: number = i % cols;
    const y: number = Math.floor(i / cols);
    let count: number = 0;

    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        if (dx === 0 && dy === 0) continue;

        const nx: number = x + dx;
        const ny: number = y + dy;
        const ni: number = ny * cols + nx;

        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && grid[ni]?.mine) {
          count += 1;
        }
      }
    }

    grid[i].adjacentMines = count;
  }

  return grid;
};
